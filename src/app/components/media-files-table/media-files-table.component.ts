import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {MediaFileEditItem, MediaFileTableItem} from "../../model/media-file";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {catchError, forkJoin, iif, map, Observable, of, switchMap, tap} from "rxjs";
import {MediaFileService} from "../../service/media-file.service";
import {ArtifactEditItem} from "../../model/artifacts";
import {ArtifactService} from "../../service/artifact.service";
import {CompositionEditItem, CompositionTableItem} from "../../model/composition";

@Component({
  selector: 'app-media-files-table',
  templateUrl: './media-files-table.component.html',
  styleUrls: ['./media-files-table.component.scss']
})
export class MediaFilesTableComponent extends BaseTableComponent<MediaFileTableItem> implements OnInit {
  private artifactId?: number;

  CRUDAction = CRUDAction;

  data$?: Observable<[MediaFileTableItem[], ArtifactEditItem]>;

  deleteAction$ = this.deleteSubject.asObservable().pipe(
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
          detail: `Error deleting media file: ${v.data}`
        });
      }
    })
  );

  editAction$ = this.editSubject.asObservable().pipe(
    switchMap(v =>
      iif(() => !!v.id,
        this.get(v.id),
        of({success: true, data: {artifactId: this.artifactId} as MediaFileEditItem} as CRUDResult<MediaFileEditItem>))
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
    map(v => v.data as MediaFileEditItem)
  );

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private artifactService: ArtifactService,
    private mediaFileService: MediaFileService,
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

  private getData(id: number): Observable<[MediaFileTableItem[], ArtifactEditItem]> {
    return forkJoin([
        this.getTable(id),
        this.getArtifact(id)
      ]
    )
  }

  private getTable(id: number): Observable<MediaFileTableItem[]> {
    return this.mediaFileService.getTable(id).pipe(
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading media files`
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
    return this.mediaFileService.delete(id).pipe(
      map(_ => {return {success: true} as CRUDResult<void>}),
      catchError(err => of({success: false, data: err.error?.message || err.message}))
    )
  }

  private get(id: number): Observable<CRUDResult<MediaFileEditItem>> {
    return this.mediaFileService.get(id).pipe(
      map(v => {return {success: true, data: v}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  crudEvent(event: any): void {
    if (event.action === CRUDAction.EA_DELETE) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete <strong> ${event.data.name}</strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteSubject.next({action: event.action, data: event.data})
        }
      });
    } else if (event.action === CRUDAction.EA_CREATE) {
      this.editSubject.next({} as MediaFileTableItem)
    } else if (event.action === CRUDAction.EA_UPDATE) {
      this.editSubject.next(event.data)
    }
  }

  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData(this.artifactId as number);
  }

}
