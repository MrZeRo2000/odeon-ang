import {Component, OnInit} from '@angular/core';
import {Artifact} from "../../../model/artifacts";
import {BaseTableComponent} from "../../base/base-table-component";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import {catchError, iif, merge, Observable, of, startWith, switchMap, tap} from "rxjs";
import {ArtifactService} from "../../../service/artifact.service";
import {SelectItem} from "primeng/api/selectitem";
import {IdName} from "../../../model/common";
import {ARTIST_TYPE_CODE_ARTIST} from "../../../model/artists";
import {ArtistService} from "../../../service/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {artifactNavigation} from "../utils/navigation";

@Component({
    selector: 'app-artifacts-all-table',
    templateUrl: './artifacts-all-table.component.html',
    styleUrl: './artifacts-all-table.component.scss',
    standalone: false
})
export class ArtifactsAllTableComponent extends BaseTableComponent<Artifact> implements OnInit {
  private static readonly SESSION_KEY = "artifacts-all-table-filter-form";

  filterForm = this.fb.group({
    artifactTypeIds: [[] as number[]],
    artistIds: [[] as IdName[]]
  })

  artifactTable$ = (artifactIds: number[] | null, artistIds: number[] | null) =>
    this.artifactService.getTableByOptional(artifactIds, artistIds).pipe(
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

  filteredArtifactTable$ = this.filterForm.valueChanges.pipe(
    startWith({}),
    tap(() => {
      const value = this.filterForm.value
      //console.log(`Writing to ${ArtifactsAllTableComponent.SESSION_KEY}: ${JSON.stringify(value)}`);
      sessionStorage.setItem(ArtifactsAllTableComponent.SESSION_KEY, JSON.stringify(value))
    }),
    switchMap(() => merge(
      of(undefined),
      iif(() => (this.filterForm.value.artifactTypeIds?.length == 0) && (this.filterForm.value.artistIds?.length == 0),
        of([]),
        this.artifactTable$(
          this.filterForm.value.artifactTypeIds == undefined ? null : this.filterForm.value.artifactTypeIds,
          this.filterForm.value.artistIds == undefined ? null : this.filterForm.value.artistIds.map(v => v.id))
      )
    )),
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

  protected loadData(): void {
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    messageService: MessageService,
    private fb: FormBuilder,
    private artifactService: ArtifactService,
    private artistService: ArtistService,
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    let artifactTypeIds: number[]
    let artistId =  Number.parseInt(this.route.snapshot.queryParams['artistId'], 10)
    let artistIds = artistId? [{id: artistId} as IdName] : []
    try {
      const savedState = sessionStorage.getItem(ArtifactsAllTableComponent.SESSION_KEY);
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

  onDetailClick(event: MouseEvent, item: Artifact): void {
    event.preventDefault();
    artifactNavigation(this.router, item.id!, item.artifactType?.id!)
  }
}
