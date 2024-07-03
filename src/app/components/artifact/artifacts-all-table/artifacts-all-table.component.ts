import { Component } from '@angular/core';
import {Artifact} from "../../../model/artifacts";
import {BaseTableComponent} from "../../base/base-table-component";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import {catchError, of, tap} from "rxjs";
import {ArtifactService} from "../../../service/artifact.service";

@Component({
  selector: 'app-artifacts-all-table',
  templateUrl: './artifacts-all-table.component.html',
  styleUrl: './artifacts-all-table.component.scss'
})
export class ArtifactsAllTableComponent extends BaseTableComponent<Artifact>{

  filterForm = this.fb.group({
    artifactType: [''],
    artist: ['']
  })

  artifactTable$ = this.artifactService.getTableByOptional().pipe(
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

  protected loadData(): void {
  }

  constructor(
    messageService: MessageService,
    private fb: FormBuilder,
    private artifactService: ArtifactService,
  ) {
    super(messageService);
  }
}
