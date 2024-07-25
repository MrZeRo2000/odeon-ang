import {Component, OnInit} from '@angular/core';
import {ArtifactService} from "../../../service/artifact.service";
import {UntypedFormBuilder} from "@angular/forms";
import {ARTIST_TYPES} from "../../../model/artists";
import {
  ARTIFACT_MUSIC_TYPE_MP3,
  ARTIFACT_MUSIC_TYPES,
  Artifact
} from "../../../model/artifacts";
import {
  catchError,
  forkJoin,
  iif,
  map,
  Observable,
  of,
  pairwise,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {CRUDResult} from "../../../model/crud";
import {ArtistService} from "../../../service/artist.service";
import {Router} from "@angular/router";
import {BaseCrudTableComponent} from "../../base/base-crud-table.component";
import {IdName} from "../../../model/common";
import {SelectItem} from "primeng/api/selectitem";

interface FilterControlsConfig
{
  artistType: [string],
  artifactTypes: [number[]]
}

@Component({
  selector: 'app-artifacts-table',
  templateUrl: './artifacts-table.component.html',
  styleUrls: ['./artifacts-table.component.scss']
})
export class ArtifactsTableComponent extends BaseCrudTableComponent<Artifact, [IdName[], Artifact]> implements OnInit {
  private static readonly SESSION_KEY = "artifacts-table-filter-form";

  readonly ARTIST_TYPES =  ARTIST_TYPES;
  readonly ARTIFACT_TYPES = ARTIFACT_MUSIC_TYPES;

  filterForm = this.fb.group(ArtifactsTableComponent.getControlsConfig())

  artifactTable$ = (v: any) => this.artifactService.getTable(v.artistType, v.artifactTypes).pipe(
    tap(v => `getting table with ${v}`),
    catchError(err => {
      this.errorObject = err;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error reading artifacts`
      });
      return of([] as Artifact[]);
    })
  );

  filteredArtifacts$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    startWith(this.filterForm.value),
    tap(v => {
      console.log(`Writing to ${ArtifactsTableComponent.SESSION_KEY}: ${JSON.stringify(v)}`);
      sessionStorage.setItem(ArtifactsTableComponent.SESSION_KEY, JSON.stringify(v))
    }),
    pairwise(),
    map(([o, v]) => {
      if (o.artistType != v.artistType) {
        this.first = 0;
      }
      return v;
    }),
    tap(v => console.log(`Reading filtered artifacts, artist type: ${JSON.stringify(v.artistType)}, artifact types: ${JSON.stringify(v.artifactTypes)}`)),
    switchMap(
      v => iif(
        () =>  !v.artifactTypes,
        of([]),
        this.artifactTable$(v)
      )
    ),
    tap(v => {
      this.filterArtists = [... new Set(v.map(v => {return v.artist?.artistName as string}))].sort().map(v => {return {label: v, value: v} as SelectItem});
      console.log('End of filteredArtifacts')
      this.selectedItem = undefined;
    })
  )

  filterArtists: SelectItem[] = [];

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
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
        deleteConfirmation: event => `Are you sure that you want to delete <strong> ${event.data.artist.artistName} - ${event.data.title}(${event.data.year})</strong>?`,
        deleteErrorMessage: v => `Error deleting artifact: ${v.data}`,
        editErrorMessage: v => `Error getting artifact details: ${v.data}`
      }
    )
  }

  getArtistType(): string {
    return this.filterForm.value.artistType;
  }

  protected loadData(): void {
    console.log(`Load data filter value: ${JSON.stringify(this.filterForm.value)}`)
    this.filterForm.setValue(this.filterForm.value);
  }

  protected getEditData(item: Artifact): Observable<CRUDResult<[IdName[], Artifact]>> {
    return forkJoin([
      this.getArtists(this.filterForm.value.artistType),
      iif(() => Object.keys(item).length === 0, of({artifactType: {id: ARTIFACT_MUSIC_TYPE_MP3}} as Artifact), this.getArtifact(item.id as number))
    ]).pipe(
      map(v => {return {success: true, data: v as [IdName[], Artifact]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  private static getControlsConfig(): FilterControlsConfig {
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
        artifactTypes: [[ARTIFACT_MUSIC_TYPES[0].code, ARTIFACT_MUSIC_TYPES[1].code]]
      }
    }
  }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onTracksButton(event: any): void {
    this.router.navigate([`/tracks/${this.selectedItem?.id}`]);
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

  getArtifact(id: number): Observable<Artifact> {
    return this.artifactService.get(id).pipe(
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artifact details: ${err.error?.message || err.message}`
        });
        return of({id: -1} as Artifact);
      })
    )
  }

  getArtists(artistTypeCode: string): Observable<Array<IdName>> {
    return this.artistService.getIdNameTable(artistTypeCode).pipe(
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
