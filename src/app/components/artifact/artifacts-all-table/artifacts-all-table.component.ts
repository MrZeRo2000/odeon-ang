import {Component, OnInit} from '@angular/core';
import {Artifact} from "../../../model/artifacts";
import {BaseTableComponent} from "../../base/base-table-component";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import {catchError, Observable, of, startWith, switchMap, tap} from "rxjs";
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
  styleUrl: './artifacts-all-table.component.scss'
})
export class ArtifactsAllTableComponent extends BaseTableComponent<Artifact> implements OnInit {

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
    switchMap(() => this.artifactTable$(
      this.filterForm.value.artifactTypeIds == undefined ? null : this.filterForm.value.artifactTypeIds,
      this.filterForm.value.artistIds == undefined ? null : this.filterForm.value.artistIds.map(v => v.id)
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
    const artistId =  Number.parseInt(this.route.snapshot.queryParams['artistId'], 10)
    const artistIds = artistId? [{id: artistId} as IdName] : []
    this.filterForm.setValue({artifactTypeIds: [], artistIds: artistIds})
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onDetailClick(event: MouseEvent, item: Artifact): void {
    event.preventDefault();
    artifactNavigation(this.router, item)
  }
}
