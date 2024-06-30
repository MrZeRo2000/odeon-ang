import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../../base/base-table.component";
import {MediaFile} from "../../../model/media-file";
import {CRUDResult} from "../../../model/crud";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {catchError, forkJoin, iif, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {MediaFileService} from "../../../service/media-file.service";
import {Artifact, isArtifactTypeVideo,} from "../../../model/artifacts";
import {ArtifactService} from "../../../service/artifact.service";
import {sumByKey} from "../../../utils/calc-utils";

@Component({
  selector: 'app-media-files-table',
  templateUrl: './media-files-table.component.html',
  styleUrls: ['./media-files-table.component.scss']
})
export class MediaFilesTableComponent extends BaseTableComponent<MediaFile, MediaFile> implements OnInit {
  sumByKey = sumByKey

  artifactId?: number;

  data$?: Observable<[MediaFile[], Artifact]>;

  isArtifactTypeVideo = false;

  //media files load
  displayMediaFilesLoadForm = false;

  private mediaFilesLoadSubject = new Subject<void>()

  mediaFilesLoad$ = this.mediaFilesLoadSubject.asObservable().pipe(
    switchMap(() =>
      forkJoin([
        this.mediaFileService.getTableFiles(this.artifactId as number),
        this.mediaFileService.getTable(this.artifactId as number).pipe(
          map(v => new Set(v.map(v => v.name)))
        ),
      ]),
    ),
    map(v => v[0]
      .filter(vi => !v[1].has(vi.text))
      .map(vi => vi.text)
    ),
    tap(v => {
      console.log(`mediaFilesLoad data: ${JSON.stringify(v)}`)
      if (!(v?.length > 0)) {
        this.messageService.add({severity:'warn', summary:'Warning', detail:'No media files to load'});
      } else {
        this.displayMediaFilesLoadForm = true;
      }
    })
  );

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
        this.getArtifact(this.artifactId as number).pipe(
          tap(v => {
            this.isArtifactTypeVideo = isArtifactTypeVideo(v.artifactType?.id as number);
          })
        )
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

  loadMediaFiles(event: any): void {
    event.preventDefault();
    this.mediaFilesLoadSubject.next();
  }

  onLoadMediaFiles(): void {
    this.displayMediaFilesLoadForm = false;
    this.loadData();
  }

}
