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
import {BaseTableComponent} from "../base/base-table.component";

@Component({
  selector: 'app-compositions-table',
  templateUrl: './compositions-table.component.html',
  styleUrls: ['./compositions-table.component.scss']
})
export class CompositionsTableComponent extends BaseTableComponent<CompositionTableItem> implements OnInit {
  private artifactId?: number;

  CRUDAction = CRUDAction;

  dataSize = 0;

  data$: Observable<[CompositionTableItem[], ArtifactEditItem]> | undefined;

  deleteAction = this.deleteSubject.asObservable().pipe(
    switchMap(v =>
      this.delete(v.data.id as number)
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

  editAction$ = this.editSubject.asObservable().pipe(
    switchMap(v =>
      iif(() => !!v.id,
        this.get(v.id),
        of({success: true, data: {artifactId: this.artifactId, num: this.dataSize + 1} as CompositionEditItem} as CRUDResult<CompositionEditItem>))
    ),
    tap(v => {
      if (v.success) {
        this.displayForm = v.success
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting composition details: ${v.data}`
        });
      }
    }),
    map(v => v.data as CompositionEditItem)
  );

  constructor(
    private route: ActivatedRoute,
    private decimalPipe: DecimalPipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private compositionService: CompositionService,
    private artifactService: ArtifactService
  ) {
    super()
  }

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
      tap(v => this.dataSize = v.length),
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

  private get(id: number): Observable<CRUDResult<CompositionEditItem>> {
    return this.compositionService.get(id).pipe(
      map(v => {return {success: true, data: v}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  crudEvent(event: any): void {
    if (event.action === CRUDAction.EA_DELETE) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete <strong> ${this.decimalPipe.transform(event.data.num, '2.0-0')} ${event.data.title}</strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteSubject.next({action: event.action, data: event.data})
        }
      });
    } else if (event.action === CRUDAction.EA_CREATE) {
      this.editSubject.next({} as CompositionTableItem)
    } else if (event.action === CRUDAction.EA_UPDATE) {
      this.editSubject.next(event.data)
    }
  }

  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData(this.artifactId as number);
  }
}
