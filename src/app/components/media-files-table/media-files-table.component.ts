import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {MediaFileEditItem, MediaFileTableItem} from "../../model/media-file";
import {CRUDResult} from "../../model/crud";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {catchError, forkJoin, iif, Observable, of} from "rxjs";
import {MediaFileService} from "../../service/media-file.service";
import {Artifact} from "../../model/artifacts";
import {ArtifactService} from "../../service/artifact.service";

@Component({
  selector: 'app-media-files-table',
  templateUrl: './media-files-table.component.html',
  styleUrls: ['./media-files-table.component.scss']
})
export class MediaFilesTableComponent extends BaseTableComponent<MediaFileTableItem, MediaFileEditItem> implements OnInit {
  private artifactId?: number;

  data$?: Observable<[MediaFileTableItem[], Artifact]>;

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
        editErrorMessage: "`Error getting track details: ${v.data}`"
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
    this.loadData();
  }

  private getData(): Observable<[MediaFileTableItem[], Artifact]> {
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

  private getArtifact(id: number): Observable<Artifact> {
    return this.artifactService.get(id).pipe(
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading artifact`
        });
        return of({} as Artifact);
      })
    )
  }

  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData();
  }

}
