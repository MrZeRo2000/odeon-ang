import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {CompositionTableItem} from "../../model/composition";
import {CompositionService} from "../../service/composition.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtifactEditItem} from "../../model/artifacts";
import {ArtifactService} from "../../service/artifact.service";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";

@Component({
  selector: 'app-compositions-table',
  templateUrl: './compositions-table.component.html',
  styleUrls: ['./compositions-table.component.scss']
})
export class CompositionsTableComponent implements OnInit {
  CRUDAction = CRUDAction;

  data$: Observable<[CompositionTableItem[], ArtifactEditItem]> | undefined;

  errorObject: any = undefined;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private compositionService: CompositionService,
    private artifactService: ArtifactService
  ) { }

  ngOnInit(): void {
    const artifactId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    console.log(`Routed with id=${artifactId}`)
    if (artifactId) {
      this.data$ = this.getData(artifactId);
    }
  }

  private getData(id: number): Observable<[CompositionTableItem[], ArtifactEditItem]> {
    return forkJoin([
      this.getTable(id),
      this.getArtifact(id)
      ]
    )
  }

  private getTable(id: number): Observable<Array<CompositionTableItem>> {
    return this.compositionService.getTable(id).pipe(
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading compositions`
        });
        return of([]);
      })
    )
  }

  private getArtifact(id: number): Observable<ArtifactEditItem> {
    return this.artifactService.get(id).pipe(
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading artifact`
        });
        return of({} as ArtifactEditItem);
      })
    )
  }

  crudEvent(event: any): void {

  }
}
