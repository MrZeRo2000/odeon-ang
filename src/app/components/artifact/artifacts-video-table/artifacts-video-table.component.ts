import { Component, OnInit } from '@angular/core';
import {BaseCrudTableComponent} from "../../base/base-crud-table.component";
import {
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
import {TaggedService} from "../../../service/tagged.service";
import {Tagged} from "../../../model/tag";
import {getFilterArtists, getFilterTags, registerFilterService} from "../utils/filter";

interface FilterControlsConfig
{
  artifactType: number
}

@Component({
    selector: 'app-artifacts-video-table',
    templateUrl: './artifacts-video-table.component.html',
    styleUrls: ['./artifacts-video-table.component.css'],
    standalone: false
})
export class ArtifactsVideoTableComponent extends BaseCrudTableComponent<Artifact, [IdName[], Artifact]> implements OnInit {
  private static readonly SESSION_KEY = "artifacts-video-table-filter-form";

  readonly ARTIFACT_VIDEO_TYPES = ARTIFACT_VIDEO_TYPES;
  readonly ARTIST_TYPE_CODE_ARTIST = ARTIST_TYPE_CODE_ARTIST;

  routedArtifactId?: number;
  routedArtifactTypeId?: number;

  isArtifactTypeVideoMusic = true;

  filterForm = this.fb.group(this.getControlsConfig());

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
      this.isArtifactTypeVideoMusic = isArtifactTypeVideoMusic(v.artifactType!)
      this.first = 0
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
      this.filterArtists = getFilterArtists(v as Array<Artifact>);
      this.filterTags = getFilterTags(v as Array<Artifact>)
    })
  );

  filterTags: Array<SelectItem<string>> = [];
  filterArtists: SelectItem[] = [];

  displayUpdateTagsForm = false

  private updateTagsSubject = new Subject<Artifact>()

  updateTagsAction$ = this.updateTagsSubject.asObservable().pipe(
    switchMap(() => forkJoin([
      this.getTags(),
      of({
        id: this.selectedItem!.id!,
        tags: this.selectedItem!.tags
      } as Tagged)
    ])),
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
    private artifactService: ArtifactService,
    private taggedService: TaggedService,
  ) {
    super(
      messageService,
      confirmationService,
      artifactService,
      {
        deleteConfirmation: event => `Are you sure that you want to delete <strong>${event.data.title}</strong>?`,
        deleteErrorMessage: v => `Error deleting artifact: ${v.data}`,
        editErrorMessage: v => `Error getting artifact details: ${v.data}`
      }
    )
  }

  ngOnInit(): void {
    this.routedArtifactId = Number.parseInt(this.route.snapshot.queryParams['artifactId'] as string, 10);
    this.routedArtifactTypeId = Number.parseInt(this.route.snapshot.queryParams['artifactTypeId'] as string, 10);
    if (this.routedArtifactTypeId) {
      this.filterForm.patchValue({artifactType: this.routedArtifactTypeId})
    }

    registerFilterService(this.filterService);
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onTracksButton(): void {
    this.router.navigate([`/tracks/${this.selectedItem?.id}`]).then();
  }

  onMediaFilesButton(): void {
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

  getTags(): Observable<Array<string>> {
    return this.taggedService.getTable().pipe(
      switchMap(v => of(v.map(v => v.name))),
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting tags: ${err.error?.message || err.message}`
        });
        throw err;
      })
    )
  }

  savedUpdateTags(): void {
    this.displayUpdateTagsForm = false;
    this.loadData();
  }
}
