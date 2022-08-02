import {Component, OnInit} from '@angular/core';
import {ArtifactService} from "../../service/artifact.service";
import {FormBuilder} from "@angular/forms";
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
  readonly ARTIST_TYPES =  ARTIST_TYPES;
  readonly ARTIFACT_TYPES = ARTIFACT_TYPES;

  CRUDAction = CRUDAction;

  filterForm = this.fb.group({
    artistType: [ARTIST_TYPES[0].code],
    artifactTypes: [[ARTIFACT_TYPES[0].code, ARTIFACT_TYPES[1].code]]
  })

  artifactTable$ = (v: any) => this.artifactService.getTable(v.artistType, v.artifactTypes).pipe(
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
    tap(v => console.log(`Reading filtered artifacts, artist type: ${JSON.stringify(v.artistType)}, artifact types: ${JSON.stringify(v.artifactTypes)}`)),
    switchMap(
      v => iif(
        () =>  v.artifactTypes.length ===0,
        of([]),
        this.artifactTable$(v)
      )
    ),
    tap(v => this.selectedItem = undefined)
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
