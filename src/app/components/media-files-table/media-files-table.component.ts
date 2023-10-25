import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {MediaFile} from "../../model/media-file";
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
export class MediaFilesTableComponent extends BaseTableComponent<MediaFile, MediaFile> implements OnInit {
  private artifactId?: number;

  data$?: Observable<[MediaFile[], Artifact]>;

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

  protected getEditData(item: MediaFile): Observable<CRUDResult<MediaFile>> {
    return iif(() => !!item.id,
      this.get(item.id as number),
      of({success: true, data: {artifactId: this.artifactId} as MediaFile} as CRUDResult<MediaFile>))

  }

  ngOnInit(): void {
    this.artifactId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    console.log(`Routed with id=${this.artifactId}`)
    this.loadData();
  }

  private getData(): Observable<[MediaFile[], Artifact]> {
    return forkJoin([
        this.getTable(this.artifactId as number),
        this.getArtifact(this.artifactId as number)
      ]
    )
  }

  private getTable(id: number): Observable<MediaFile[]> {
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

  sumByKey(data: any, key: string): number {
    return data.map((v: any) => v[key]).filter((v: number) => !isNaN(v)).reduce((a: number, b: number) => a + b, 0);
  }

}
