import { Component } from '@angular/core';
import {Artifact, ARTIFACT_MUSIC_TYPES, ARTIFACT_VIDEO_TYPES} from "../../../model/artifacts";
import {BaseTableComponent} from "../../base/base-table-component";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import {catchError, of, startWith, switchMap, tap} from "rxjs";
import {ArtifactService} from "../../../service/artifact.service";
import {ARTIST_TYPES} from "../../../model/artists";
import {SelectItem} from "primeng/api/selectitem";

@Component({
  selector: 'app-artifacts-all-table',
  templateUrl: './artifacts-all-table.component.html',
  styleUrl: './artifacts-all-table.component.scss'
})
export class ArtifactsAllTableComponent extends BaseTableComponent<Artifact>{

  filterForm = this.fb.group({
    artifactTypeIds: [[] as number[]],
    artistIds: [[] as number[]]
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
      tap(v => this.filterArtists = [... new Set(v.map(v => {return v.artist?.artistName as string}))].sort().map(v => {return {label: v, value: v} as SelectItem}))
  );

  filteredArtifactTable$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    tap(v => {console.log(`filter value: ${JSON.stringify(v)}`)}),
    switchMap(v => this.artifactTable$(
      v.artifactTypeIds == undefined ? null : v.artifactTypeIds,
      v.artistIds == undefined ? null : v.artistIds
    ))
  )

  filterArtists: SelectItem[] = [];

  protected loadData(): void {
  }

  constructor(
    messageService: MessageService,
    private fb: FormBuilder,
    private artifactService: ArtifactService,
  ) {
    super(messageService);
  }

  protected readonly ARTIST_TYPES = ARTIST_TYPES;
  protected readonly ARTIFACT_TYPES = ARTIFACT_MUSIC_TYPES.concat(ARTIFACT_VIDEO_TYPES);
}
