import {Component, OnInit} from '@angular/core';
import {Artifact} from "../../../model/artifacts";
import {BaseTableComponent} from "../../base/base-table-component";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import {catchError, of, startWith, switchMap, tap} from "rxjs";
import {ArtifactService} from "../../../service/artifact.service";
import {SelectItem} from "primeng/api/selectitem";

@Component({
  selector: 'app-artifacts-all-table',
  templateUrl: './artifacts-all-table.component.html',
  styleUrl: './artifacts-all-table.component.scss'
})
export class ArtifactsAllTableComponent extends BaseTableComponent<Artifact> implements OnInit {

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

  ngOnInit(): void {
    this.filterForm.setValue({artifactTypeIds: [], artistIds: []})
  }
}
