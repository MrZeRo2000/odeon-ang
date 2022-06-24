import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, forkJoin, iif, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {CompositionEditItem, CompositionTableItem} from "../../model/composition";
import {CompositionService} from "../../service/composition.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtifactEditItem, ArtifactTableItem} from "../../model/artifacts";
import {ArtifactService} from "../../service/artifact.service";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-compositions-table',
  templateUrl: './compositions-table.component.html',
  styleUrls: ['./compositions-table.component.scss']
})
export class CompositionsTableComponent implements OnInit {
  private artifactId?: number;

  CRUDAction = CRUDAction;

  data$: Observable<[CompositionTableItem[], ArtifactEditItem]> | undefined;

  errorObject: any = undefined;

  private crudOperationSubject: Subject<CRUDOperation<CompositionEditItem | CompositionTableItem>> = new Subject<CRUDOperation<CompositionEditItem | CompositionTableItem>>();

  crudOperationAction$ = this.crudOperationSubject.asObservable().pipe(
    switchMap(v =>
      iif(() => v.action === CRUDAction.EA_DELETE, this.delete(v.data.id as number),
        //iif(() => v.action === CRUDAction.EA_CREATE, this.artifactService.createArtifact(v.data as ArtifactEditItem),
        //iif(() => v.action === CRUDAction.EA_UPDATE, this.artifactService.updateArtifact(v.data as ArtifactEditItem),
        of(undefined))
    ),
    tap(v => {
      if (v?.success) {
        this.data$ = this.getData(this.artifactId as number);
      } else if (!!v) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error: ${v.data}`
        });
      }
    })
  );

  constructor(
    private route: ActivatedRoute,
    private decimalPipe: DecimalPipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private compositionService: CompositionService,
    private artifactService: ArtifactService
  ) { }

  ngOnInit(): void {
    this.artifactId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    console.log(`Routed with id=${this.artifactId}`)
    if (this.artifactId) {
      this.data$ = this.getData(this.artifactId);
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

  private delete(id: number): Observable<CRUDResult<void>> {
    return this.compositionService.delete(id).pipe(
      map(_ => {return {success: true} as CRUDResult<void>}),
      catchError(err => of({success: false, data: err.error?.message || err.message}))
    )
  }

  crudEvent(event: any): void {
    if (event.action === CRUDAction.EA_DELETE) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete <strong> ${this.decimalPipe.transform(event.data.num, '2.0-0')} ${event.data.title}</strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.crudOperationSubject.next({action: CRUDAction.EA_DELETE, data: event.data})
        }
      });
    }
  }
}
