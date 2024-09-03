import { Component } from '@angular/core';
import {BaseTableComponent} from "../../base/base-table-component";
import {Track} from "../../../model/track";
import {IdName} from "../../../model/common";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import {ArtistService} from "../../../service/artist.service";
import {catchError, iif, merge, Observable, of, startWith, switchMap, tap} from "rxjs";
import {Artifact} from "../../../model/artifacts";
import {SelectItem} from "primeng/api/selectitem";
import {ARTIST_TYPE_CODE_ARTIST} from "../../../model/artists";
import {TrackService} from "../../../service/track.service";
import {ActivatedRoute, Router} from "@angular/router";
import {artifactNavigation} from "../../artifact/utils/navigation";

@Component({
  selector: 'app-tracks-all-table',
  templateUrl: './tracks-all-table.component.html',
  styleUrl: './tracks-all-table.component.scss'
})
export class TracksAllTableComponent extends BaseTableComponent<Track> {
  private static readonly SESSION_KEY = "tracks-all-table-filter-form";

  filterForm = this.fb.group({
    artifactTypeIds: [[] as number[]],
    artistIds: [[] as IdName[]]
  })

  trackTable$ = (artifactIds: number[] | null, artistIds: number[] | null) =>
    this.trackService.getTableByOptional(artifactIds, artistIds).pipe(
      tap(v => `getting table with ${v}`),
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading artifacts`
        });
        return of([] as Artifact[]);
      }),
      tap(v => this.filterArtists =
        [... new Set(v.map(v => {return v.artist?.artistName as string}))]
          .sort()
          .map(v => {return {label: v, value: v} as SelectItem}))
    );

  filteredTrackTable$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    tap(() => {
      const value = this.filterForm.value
      sessionStorage.setItem(TracksAllTableComponent.SESSION_KEY, JSON.stringify(value))
    }),
    switchMap(() => merge(
      of(undefined),
      iif(
        () => (this.filterForm.value.artifactTypeIds?.length == 0) &&
              (this.filterForm.value.artistIds?.length == 0),
        of([]),
        this.trackTable$(
          this.filterForm.value.artifactTypeIds == undefined ? null : this.filterForm.value.artifactTypeIds,
          this.filterForm.value.artistIds == undefined ? null : this.filterForm.value.artistIds.map(v => v.id))
        )
    ))
  )

  filterArtists: SelectItem[] = [];

  artistsTable$: Observable<Array<IdName>> =
    this.artistService.getIdNameTable(ARTIST_TYPE_CODE_ARTIST).pipe(
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artists: ${err.error?.message || err.message}`
        });
        return of([]);
      })
    )

  protected loadData(): void { }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    messageService: MessageService,
    private fb: FormBuilder,
    private trackService: TrackService,
    private artistService: ArtistService,
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    let artifactTypeIds: number[]
    const artistId =  Number.parseInt(this.route.snapshot.queryParams['artistId'], 10)
    let artistIds = artistId? [{id: artistId} as IdName] : []
    try {
      const savedState = sessionStorage.getItem(TracksAllTableComponent.SESSION_KEY);
      const savedObject = JSON.parse(savedState as string);
      artifactTypeIds = savedObject.artifactTypeIds as number[]
      if (artistIds.length === 0) {
        artistIds = savedObject.artistIds as IdName[]
      }
    } catch (e) {
      artifactTypeIds = []
    }

    const value = {artifactTypeIds: artifactTypeIds || [], artistIds: artistIds || []}
    console.log(`Setting value: ${JSON.stringify(value)}`)
    this.filterForm.setValue(value)
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onDetailClick(event: MouseEvent, item: Track): void {
    event.preventDefault();
    artifactNavigation(this.router, item.artifact.id!, item.artifactType?.id!)
  }
}
