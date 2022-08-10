import {Component, OnInit} from '@angular/core';
import {ArtifactService} from "../../service/artifact.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ARTIST_TYPES, ArtistEditItem} from "../../model/artists";
import {ARTIFACT_TYPES, ArtifactEditItem, ArtifactTableItem} from "../../model/artifacts";
import {catchError, finalize, forkJoin, iif, map, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {ArtistService} from "../../service/artist.service";
import {Router} from "@angular/router";
import {BaseTableComponent} from "../base/base-table.component";
import {IdName} from "../../model/common";

@Component({
  selector: 'app-artifacts-table',
  templateUrl: './artifacts-table.component.html',
  styleUrls: ['./artifacts-table.component.scss']
})
export class ArtifactsTableComponent extends BaseTableComponent<ArtifactTableItem, [IdName[], ArtifactEditItem]> implements OnInit {
  private static readonly SESSION_KEY = "artifacts-table-filter-form";

  readonly ARTIST_TYPES =  ARTIST_TYPES;
  readonly ARTIFACT_TYPES = ARTIFACT_TYPES;

  filterForm = this.fb.group({
    artistType: [ArtifactsTableComponent.getArtistType()],
    artifactTypes: [ArtifactsTableComponent.getArtifactTypes()]
  })

  artifactTable$ = (v: any) => this.artifactService.getTable(v.artistType, v.artifactTypes).pipe(
    tap(v => `getting table with ${v}`),
    catchError(err => {
      this.errorObject = err;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error reading artifacts`
      });
      return of([]);
    })
  );

  filteredArtifacts$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    tap(v => {
      console.log(`Writing to ${ArtifactsTableComponent.SESSION_KEY}: ${JSON.stringify(v)}`);
      sessionStorage.setItem(ArtifactsTableComponent.SESSION_KEY, JSON.stringify(v))
    }),
    map(v => {return v;}),
    tap(v => console.log(`Reading filtered artifacts, artist type: ${JSON.stringify(v.artistType)}, artifact types: ${JSON.stringify(v.artifactTypes)}`)),
    switchMap(
      v => iif(
        () =>  !v.artifactTypes,
        of([]),
        this.artifactTable$(v)
      )
    ),
    tap(v => {
      this.selectedItem = undefined;
      this.first = 0;
    })
  )

  constructor(
    private router: Router,
    private fb: FormBuilder,
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private artistService: ArtistService,
    private artifactService: ArtifactService
  ) {
    super(
      messageService,
      confirmationService,
      artifactService,
      {
        deleteConfirmation: "`Are you sure that you want to delete <strong> ${event.data.artistName} - ${event.data.title}(${event.data.year})</strong>?`",
        deleteErrorMessage: "`Error deleting artifact: ${v.data}`",
        editErrorMessage: "`Error getting artifact details: ${err.error?.message || err.message}`"
      }
    )
  }

  protected loadData(): void {
    console.log(`Load data filter value: ${JSON.stringify(this.filterForm.value)}`)
    this.filterForm.setValue(this.filterForm.value);
  }

  protected getEditData(item: ArtifactTableItem): Observable<CRUDResult<[IdName[], ArtifactEditItem]>> {
    return forkJoin([
      this.getArtists(),
      iif(() => Object.keys(item).length === 0, of({} as ArtifactEditItem), this.getArtifact(item.id))
    ]).pipe(
      map(v => {return {success: true, data: v as [IdName[], ArtifactEditItem]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  private static getControlsConfig(): {
    artistType: [string],
    artifactTypes: [number[]]
  } {
    try {
      const savedState = sessionStorage.getItem(ArtifactsTableComponent.SESSION_KEY);
      const savedObject = JSON.parse(savedState as string);
      return {
        artistType: [savedObject.artistType as string],
        artifactTypes: [savedObject.artifactTypes as number[]]
      }
    } catch (e)  {
      return {
        artistType: [ARTIST_TYPES[0].code],
        artifactTypes: [[ARTIFACT_TYPES[0].code, ARTIFACT_TYPES[1].code]]
      }
    }
  }

  private static getArtistType(): string {
    const savedState = sessionStorage.getItem(ArtifactsTableComponent.SESSION_KEY);
    if (savedState) {
      return JSON.parse(savedState).artistType
    } else {
      return ARTIST_TYPES[0].code;
    }
  }

  private static getArtifactTypes(): number[] {
    const savedState = sessionStorage.getItem(ArtifactsTableComponent.SESSION_KEY);
    if (savedState) {
      return JSON.parse(savedState).artifactTypes
    } else {
      return [ARTIFACT_TYPES[0].code, ARTIFACT_TYPES[1].code];
    }
  }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onCompositionsButton(event: any): void {
    this.router.navigate([`/compositions/${this.selectedItem?.id}`]);
  }

  onMediaFilesButton(event: any): void {
    this.router.navigate([`/media-files/${this.selectedItem?.id}`]);
  }

  deleteArtifact(id: number): Observable<CRUDResult<void>> {
    return this.artifactService.delete(id).pipe(
      map(_ => {return {success: true} as CRUDResult<void>}),
      catchError(err => of({success: false, data: err.error?.message || err.message}))
    )
  }

  override savedEditData(event: any): void {
    super.savedEditData(event);
    this.filterForm.setValue(this.filterForm.value);
  }

  getArtifact(id: number): Observable<ArtifactEditItem> {
    return this.artifactService.get(id).pipe(
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artifact details: ${err.error?.message || err.message}`
        });
        return of({id: -1} as ArtifactEditItem);
      })
    )
  }

  getArtists(): Observable<Array<IdName>> {
    return this.artistService.getIdNameTable().pipe(
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artists: ${err.error?.message || err.message}`
        });
        return of([]);
      })
    )
  }

}
