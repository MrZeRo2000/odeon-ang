import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../../base/base-table.component";
import {
  ARTIFACT_TYPE_VIDEO, ARTIFACT_VIDEO_TYPE_MUSIC,
  ARTIFACT_VIDEO_TYPES,
  Artifact, isArtifactTypeVideoMusic
} from "../../../model/artifacts";
import {IdName} from "../../../model/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ConfirmationService, FilterService, MessageService, SelectItem} from "primeng/api";
import {ArtistService} from "../../../service/artist.service";
import {ArtifactService} from "../../../service/artifact.service";
import {CRUDResult} from "../../../model/crud";
import {catchError, forkJoin, iif, map, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {ARTIST_TYPE_CODE_ARTIST} from "../../../model/artists";

interface FilterControlsConfig
{
  artifactType: number
}

@Component({
  selector: 'app-artifacts-video-table',
  templateUrl: './artifacts-video-table.component.html',
  styleUrls: ['./artifacts-video-table.component.scss']
})
export class ArtifactsVideoTableComponent extends BaseTableComponent<Artifact, [IdName[], Artifact]> implements OnInit {
  private static readonly SESSION_KEY = "artifacts-video-table-filter-form";
  ARTIFACT_VIDEO_TYPE_MUSIC = ARTIFACT_VIDEO_TYPE_MUSIC;

  readonly ARTIFACT_TYPE_VIDEO = ARTIFACT_TYPE_VIDEO;

  readonly ARTIFACT_VIDEO_TYPES = ARTIFACT_VIDEO_TYPES;

  readonly ARTIST_TYPE_CODE_ARTIST = ARTIST_TYPE_CODE_ARTIST;

  private routedArtifactId?: number;
  private routedArtifactTypeId?: number;

  filterForm = this.fb.group(this.getControlsConfig());

  filterData$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    tap(v => console.log(`filter data got value: ${JSON.stringify(v)}`)),
    tap(v => {this.first = 0})
  );

  artifactTable$ = (v: any) => this.artifactService.getTable(ARTIST_TYPE_CODE_ARTIST, [v.artifactType]).pipe(
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

  artifactRow$ = (v: number) => this.artifactService.get(v).pipe(
    tap(v => `getting row with ${v}`),
    catchError(err => {
      this.errorObject = err;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error reading artifact row`
      });
      return of([]);
    }),
    map(v => [v])
  );

  filteredArtifacts$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    tap(v => {
      sessionStorage.setItem(ArtifactsVideoTableComponent.SESSION_KEY, JSON.stringify(v))
    }),
    switchMap(
      v => iif(
        () => !v.artifactType,
        of([]),
        iif(
          () => !!this.routedArtifactId,
          this.artifactRow$(this.routedArtifactId as number),
          this.artifactTable$(v)
        )
      )
    ),
    tap(v => {
      this.selectedItem = undefined;
      // console.log(`Filtered artifacts: ${JSON.stringify(v)}`)
      this.filterTags = [... new Set(v.map(v => (v as Artifact).tags || []).flat())].sort().map(v => {return {label: v, value: v} as SelectItem});
    })
  );

  filterTags: Array<SelectItem<string>> = [];

  displayUpdateTagsForm = false

  private updateTagsSubject = new Subject<Artifact>()

  updateTagsAction$ = this.updateTagsSubject.asObservable().pipe(
    tap(() => {
      this.displayUpdateTagsForm = true
    })
  )

  private getControlsConfig(): FilterControlsConfig {
    let artifactType;

    // take from routed, otherwise from saved or default
    if (this.routedArtifactTypeId) {
      artifactType = this.routedArtifactTypeId
    } else {
      try {
        const savedState = sessionStorage.getItem(ArtifactsVideoTableComponent.SESSION_KEY);
        const savedObject = JSON.parse(savedState as string);
        artifactType = savedObject.artifactType as number
      } catch (e) {
        artifactType = ARTIFACT_VIDEO_TYPES[0].code
      }
    }

    return {artifactType}
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private filterService: FilterService,
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
        deleteConfirmation: "`Are you sure that you want to delete <strong>${event.data.title}</strong>?`",
        deleteErrorMessage: "`Error deleting artifact: ${v.data}`",
        editErrorMessage: "`Error getting artifact details: ${err.error?.message || err.message}`"
      }
    )
  }

  ngOnInit(): void {
    this.routedArtifactId = Number.parseInt(this.route.snapshot.queryParams['artifactId'] as string, 10);
    this.routedArtifactTypeId = Number.parseInt(this.route.snapshot.queryParams['artifactTypeId'] as string, 10);
    if (this.routedArtifactTypeId) {
      this.filterForm.setValue({artifactType: this.routedArtifactTypeId})
    }

    this.filterService.register(
      'filter_tags',
      (value: any, filter: any): boolean => {
        console.log(`Filter: Value: ${JSON.stringify(value)}, filter: ${JSON.stringify(filter)}`)
        if (filter === undefined || filter === null || filter.length === 0) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return (value as string[]).filter(v => filter.indexOf(v) !== -1).length > 0;
      }
    )
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onTracksButton(event: any): void {
    this.router.navigate([`/tracks/${this.selectedItem?.id}`]).then();
  }

  onMediaFilesButton(event: any): void {
    this.router.navigate([`/media-files/${this.selectedItem?.id}`]).then();
  }

  onTagsButton(event: any): void {
    event.preventDefault()
    this.updateTagsSubject.next(this.selectedItem!)
  }

  protected loadData(): void {
    this.filterForm.setValue(this.filterForm.value as FilterControlsConfig);
  }

  protected getEditData(item: Artifact): Observable<CRUDResult<[IdName[], Artifact]>> {
    return forkJoin([
      this.getArtists(),
      iif(() =>
        Object.keys(item).length === 0,
        of({artifactType: {id: this.filterForm.value.artifactType}} as Artifact),
        this.getArtifact(item.id as number)
      )
    ]).pipe(
      map(v => {return {success: true, data: v as [IdName[], Artifact]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
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

  getArtists(): Observable<Array<IdName>> {
    if (isArtifactTypeVideoMusic(this.filterForm.value.artifactType as number)) {
      return this.artistService.getIdNameTable(ARTIST_TYPE_CODE_ARTIST).pipe(
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting artists: ${err.error?.message || err.message}`
          });
          return of([]);
        })
      )
    } else {
      return of([]);
    }
  }

  savedUpdateTags(event: any): void {
    this.displayUpdateTagsForm = false;
    this.loadData();
  }
}
