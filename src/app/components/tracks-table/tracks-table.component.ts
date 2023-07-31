import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, forkJoin, iif, map, Observable, of, switchMap, take, tap} from "rxjs";
import {Track} from "../../model/track";
import {TrackService} from "../../service/track.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {
  Artifact,
  isArtifactTypeMusic,
  isArtifactTypeVideo,
  isArtifactTypeVideoWithProducts
} from "../../model/artifacts";
import {ArtifactService} from "../../service/artifact.service";
import {CRUDResult} from "../../model/crud";
import {DecimalPipe} from "@angular/common";
import {BaseTableComponent} from "../base/base-table.component";
import {MediaFileService} from "../../service/media-file.service";
import {IdName, IdTitle} from "../../model/common";
import {ArtistService} from "../../service/artist.service";
import {DVProductService} from "../../service/dvproduct.service";

@Component({
  selector: 'app-tracks-table',
  templateUrl: './tracks-table.component.html',
  styleUrls: ['./tracks-table.component.scss']
})
export class TracksTableComponent extends BaseTableComponent<Track, [Track, IdName[], IdName[], IdTitle[]]> implements OnInit {
  artifactId?: number;
  dvProductId?: number;

  artistTypeCode: string = 'A';
  artifactTypeId?: number;
  isArtifactTypeMusic = true;
  isArtifactTypeVideo = false;

  dataSize = 0;

  data$?: Observable<[Track[], Artifact]>;

  deleteAction = this.deleteSubject.asObservable().pipe(
    switchMap(v =>
      this.delete(v.data.id as number)
    ),
    tap(v => {
      if (v?.success) {
        this.data$ = this.getData();
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
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private trackService: TrackService,
    private artifactService: ArtifactService,
    private mediaFileService: MediaFileService,
    private artistService: ArtistService,
    private dvProductService: DVProductService,
  ) {
    super(
      messageService,
      confirmationService,
      trackService,
      {
        deleteConfirmation: "`Are you sure that you want to delete <strong> ${this.decimalPipe.transform(event.data.num, '2.0-0')} ${event.data.title}</strong>?`",
        deleteErrorMessage: "`Error deleting track: ${v.data}`",
        editErrorMessage: "`Error getting track details: ${v.data}`"
      }

    );
  }

  protected loadData(): void {
    if (this.artifactId || this.dvProductId) {
      this.data$ = this.getData();
    }
  }

  protected getEditData(item: Track): Observable<CRUDResult<[Track, IdName[], IdName[], IdTitle[]]>> {
    return forkJoin([
      iif(() => !!item.id,
        this.trackService.get(item.id as number),
        of({artifact: {id: this.artifactId} as Artifact, num: this.dataSize + 1} as Track)
      ),
      this.mediaFileService.getIdNameTable(this.artifactId as number),
      this.artistService.getIdNameTable(this.artistTypeCode as string),
      iif (() => isArtifactTypeVideoWithProducts(this.artifactTypeId as number),
        this.dvProductService.getIdTitleTable(this.artifactTypeId as number).pipe(take(1)),
        of([])
        ),
    ]).pipe(
      map(v => {return {success: true, data: v as [Track, IdName[], IdName[], IdTitle[]]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  ngOnInit(): void {
    this.artifactId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    this.dvProductId =  Number.parseInt(this.route.snapshot.queryParams['dvProductId'], 10)
    console.log(`Routed with id=${this.artifactId}, dvProductId=${this.dvProductId}`);
    this.loadData();
  }

  private getData(): Observable<[Track[], Artifact]> {
    if (this.artifactId) {
      return forkJoin([
          this.getTable(this.artifactId),
          this.getArtifact(this.artifactId),
        ]
      )
    } else if (this.dvProductId) {
      return this.getTableByProductId(this.dvProductId).pipe(
        switchMap(v => {
          return forkJoin([
            of(v),
            this.getArtifact(v[0].artifact.id as number)
            ]
          )
        })
      )
    } else {
      return forkJoin([of([]), of({} as Artifact)])
    }
  }

  private getTable(id: number): Observable<Array<Track>> {
    return this.trackService.getTable(id).pipe(
      tap(v => this.dataSize = v.length),
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading tracks by id ${id}`
        });
        return of([]);
      })
    )
  }

  private getTableByProductId(dvProductId: number): Observable<Array<Track>> {
    return this.trackService.getTableByProductId(dvProductId).pipe(
      tap(v => this.dataSize = v.length),
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading tracks by product id ${dvProductId}`
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
      }),
      tap(v => {
        console.log(`Got artistTypeCode: ${v.artist?.artistType}, artifactTypeId: ${v.artifactType?.id}`);
        this.artistTypeCode = v.artist?.artistType as string;
        this.artifactTypeId = v.artifactType?.id as number;
        this.isArtifactTypeMusic = isArtifactTypeMusic(this.artifactTypeId);
        this.isArtifactTypeVideo = isArtifactTypeVideo(this.artifactTypeId);
      })
    )
  }
  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData();
  }
}
