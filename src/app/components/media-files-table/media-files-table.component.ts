import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {MediaFileEditItem, MediaFileTableItem} from "../../model/media-file";
import {CRUDAction, CRUDResult} from "../../model/crud";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {catchError, forkJoin, iif, map, Observable, of, switchMap, tap} from "rxjs";
import {MediaFileService} from "../../service/media-file.service";
import {ArtifactEditItem} from "../../model/artifacts";
import {ArtifactService} from "../../service/artifact.service";

@Component({
  selector: 'app-media-files-table',
  templateUrl: './media-files-table.component.html',
  styleUrls: ['./media-files-table.component.scss']
})
export class MediaFilesTableComponent extends BaseTableComponent<MediaFileTableItem, MediaFileEditItem> implements OnInit {
  private artifactId?: number;

  CRUDAction = CRUDAction;

  data$?: Observable<[MediaFileTableItem[], ArtifactEditItem]>;

  constructor(
    private route: ActivatedRoute,
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private artifactService: ArtifactService,
    private mediaFileService: MediaFileService,
  ) {
    super(
      messageService,
      confirmationService,
      mediaFileService,
      {
        deleteConfirmation: "`Are you sure that you want to delete <strong> ${event.data.name}</strong>?`",
        deleteErrorMessage: "`Error deleting media file: ${v.data}`",
        editErrorMessage: "`Error getting composition details: ${v.data}`"
      }
    )
  }

  protected loadData(): void {
    if (this.artifactId) {
      this.data$ = this.getData();
    }
  }

  protected getEditData(item: MediaFileTableItem): Observable<CRUDResult<MediaFileEditItem>> {
    return iif(() => !!item.id,
      this.get(item.id),
      of({success: true, data: {artifactId: this.artifactId} as MediaFileEditItem} as CRUDResult<MediaFileEditItem>))

  }

  ngOnInit(): void {
    this.artifactId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    console.log(`Routed with id=${this.artifactId}`)
  }

  private getData(): Observable<[MediaFileTableItem[], ArtifactEditItem]> {
    return forkJoin([
        this.getTable(this.artifactId as number),
        this.getArtifact(this.artifactId as number)
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

  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData();
  }

}
