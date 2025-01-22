import {Component, OnInit} from '@angular/core';
import {ArtifactService} from "../../../service/artifact.service";
import {FormBuilder} from "@angular/forms";
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
import {ActivatedRoute, Router} from "@angular/router";
import {BaseCrudTableComponent} from "../../base/base-crud-table.component";
import {IdName} from "../../../model/common";
import {SelectItem} from "primeng/api/selectitem";

interface FilterControlsConfig
{
  artistType: [string],
  artifactTypes: [number[]]
}

interface FilterControlsConfigValue
{
  artistType: string,
  artifactTypes: number[]
}

@Component({
    selector: 'app-artifacts-table',
    templateUrl: './artifacts-table.component.html',
    styleUrls: ['./artifacts-table.component.scss'],
    standalone: false
})
export class ArtifactsTableComponent extends BaseCrudTableComponent<Artifact, [IdName[], Artifact]> implements OnInit {
  private static readonly SESSION_KEY = "artifacts-table-filter-form";

  readonly ARTIST_TYPES =  ARTIST_TYPES;
  readonly ARTIFACT_TYPES = ARTIFACT_MUSIC_TYPES;

  routedArtifactId?: number;
  routedArtifactTypeId?: number;

  filterForm = this.fb.group(this.getControlsConfig())

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

  artifactRow$ = (v: number) => this.artifactService.get(v).pipe(
    tap(v => `getting row with ${v}`),
    catchError(err => {
      this.errorObject = err;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error reading artifact row`
      });
      return of([] as Artifact[]);
    }),
    map(v => [v])
  );

  filteredArtifacts$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    startWith(this.filterForm.value),
    tap(() => console.log(`filterForm value: ${JSON.stringify(this.filterForm.value)}`)),
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
        iif(
          () => !!this.routedArtifactId,
          this.artifactRow$(this.routedArtifactId as number),
          this.artifactTable$(v)
        )
      )
    ),
    tap(v => {
      this.filterArtists = [... new Set(v.map(v => {return (v as Artifact).artist?.artistName as string}))].sort().map(v => {return {label: v, value: v} as SelectItem});
      console.log('End of filteredArtifacts')
      this.selectedItem = undefined;
    })
  )

  filterArtists: SelectItem[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
        deleteConfirmation: event => `Are you sure that you want to delete <strong> ${event.data.artist.artistName} - ${event.data.title}(${event.data.year})</strong>?`,
        deleteErrorMessage: v => `Error deleting artifact: ${v.data}`,
        editErrorMessage: v => `Error getting artifact details: ${v.data}`
      }
    )
  }

  getArtistType(): string {
    return this.filterForm.value.artistType as string
  }

  protected loadData(): void {
    this.filterForm.setValue(this.getControlsConfigValue());
  }

  protected getEditData(item: Artifact): Observable<CRUDResult<[IdName[], Artifact]>> {
    return forkJoin([
      this.getArtists(this.filterForm.value.artistType as string),
      iif(() =>
        Object.keys(item).length === 0,
        of({artifactType: {id: ARTIFACT_MUSIC_TYPE_MP3}} as Artifact),
        this.getArtifact(item.id as number)
      )
    ]).pipe(
      map(v => {return {success: true, data: v as [IdName[], Artifact]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  private getControlsConfig(): FilterControlsConfig {
    let artifactTypes: number[];
    let artistType: string;

    if (this.routedArtifactTypeId) {
      artifactTypes = [this.routedArtifactTypeId] as number[]
      artistType = ARTIST_TYPES[0].code
    } else {
      try {
        const savedState = sessionStorage.getItem(ArtifactsTableComponent.SESSION_KEY);
        const savedObject = JSON.parse(savedState as string);
        artistType = savedObject.artistType as string
        artifactTypes = savedObject.artifactTypes as number[]
      } catch (e) {
        artistType = ARTIST_TYPES[0].code
        artifactTypes = [ARTIFACT_MUSIC_TYPES[0].code, ARTIFACT_MUSIC_TYPES[1].code] as number[]
       }
    }

    return {'artistType': [artistType], 'artifactTypes': [artifactTypes]}
  }

  private getControlsConfigValue(): FilterControlsConfigValue {
    const controlsConfig = this.getControlsConfig()
    return {
      artistType: controlsConfig.artistType[0],
      artifactTypes: controlsConfig.artifactTypes[0]
    }
  }

  ngOnInit(): void {
    this.routedArtifactId = Number.parseInt(this.route.snapshot.queryParams['artifactId'] as string, 10);
    this.routedArtifactTypeId = Number.parseInt(this.route.snapshot.queryParams['artifactTypeId'] as string, 10);
    if (this.routedArtifactTypeId) {
      this.filterForm.setValue(this.getControlsConfigValue())
    }
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onTracksButton(): void {
    this.router.navigate([`/tracks/${this.selectedItem?.id}`]);
  }

  onMediaFilesButton(): void {
    this.router.navigate([`/media-files/${this.selectedItem?.id}`]);
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
