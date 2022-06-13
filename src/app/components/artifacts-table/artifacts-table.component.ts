import { Component, OnInit } from '@angular/core';
import {ArtifactService} from "../../service/artifact.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ARTIST_TYPES} from "../../model/artists";
import {ARTIFACT_TYPES} from "../../model/artifacts";
import {catchError, iif, of, startWith, switchMap, takeWhile, tap} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-artifacts-table',
  templateUrl: './artifacts-table.component.html',
  styleUrls: ['./artifacts-table.component.scss']
})
export class ArtifactsTableComponent implements OnInit {
  readonly ARTIST_TYPES =  ARTIST_TYPES;
  readonly ARTIFACT_TYPES = ARTIFACT_TYPES;

  errorObject: any = undefined;

  filterForm = this.fb.group({
    artistType: [ARTIST_TYPES[0].code],
    artifactTypes: [[ARTIFACT_TYPES[0].code, ARTIFACT_TYPES[1].code]]
  })

  artifactTable$ = (v: any) => this.artifactService.getArtifactTable(v.artistType, v.artifactTypes).pipe(
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
    tap(v => console.log(`Artist type: ${JSON.stringify(v.artistType)}, artifact types: ${JSON.stringify(v.artifactTypes)}`)),
    switchMap(
      v => iif(
        () =>  v.artifactTypes.length ===0,
        of([]),
        this.artifactTable$(v)
      )
    ),
    tap(v => console.log(`Returned: ${JSON.stringify(v)}`))
  )

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private artifactService: ArtifactService
  ) { }

  ngOnInit(): void {
  }

}
