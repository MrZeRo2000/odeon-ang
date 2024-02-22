import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, forkJoin, iif, map, Observable, of, Subject, switchMap, take, tap} from "rxjs";
import {Track} from "../../../model/track";
import {TrackService} from "../../../service/track.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {
  Artifact,
  isArtifactTypeMusic,
  isArtifactTypeVideo,
  isArtifactTypeVideoMusic,
  isArtifactTypeVideoWithProducts
} from "../../../model/artifacts";
import {ArtifactService} from "../../../service/artifact.service";
import {CRUDResult} from "../../../model/crud";
import {DecimalPipe} from "@angular/common";
import {BaseTableComponent} from "../../base/base-table.component";
import {MediaFileService} from "../../../service/media-file.service";
import {IdName, IdTitle} from "../../../model/common";
import {ArtistService} from "../../../service/artist.service";
import {DVProductService} from "../../../service/dvproduct.service";
import {MediaFile} from "../../../model/media-file";
import {DVProduct} from "../../../model/dv-product";
import {sumByKey} from "../../../utils/calc-utils";

@Component({
  selector: 'app-tracks-table',
  templateUrl: './tracks-table.component.html',
  styleUrls: ['./tracks-table.component.scss']
})
export class TracksTableComponent extends BaseTableComponent<Track, [Track, MediaFile[], IdName[], IdTitle[]]> implements OnInit {
  sumByKey = sumByKey;

  artifactId?: number;
  dvProductId?: number;

  artistTypeCode: string = 'A';
  artifactTypeId?: number;
  isArtifactTypeMusic = true;
  isArtifactTypeVideo = false;
  isArtifactTypeVideoMusic = false;
  isArtifactVideoWithProducts = false;

  dataSize = 0;

  data$?: Observable<[Track[], Artifact]>;

  displayProductForm = false;

  showProductAction: Subject<number> = new Subject();

  product$ = this.showProductAction.asObservable().pipe(
    switchMap(v => {
      return this.dvProductService.get(v).pipe(
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting product details: ${err.error?.message || err.message}`
          })
          return of({} as DVProduct);
        }),
        tap(v => {this.displayProductForm = !!v.id;})
      )
    })
  )

  private resetTrackNumbersSubject: Subject<number> = new Subject();

  resetTrackNumbers$ = this.resetTrackNumbersSubject.asObservable().pipe(
    tap(() => {console.log('Resetting track numbers')}),
    switchMap(v => {
      return this.trackService.resetTrackNumbers(v).pipe(
        map(r => {return r.rowsAffected}),
        catchError(err => {
          console.log(`Error:${JSON.stringify(err)}`)
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error resetting track numbers`
          })
          return of(0)
        })
      )}),
    tap(r => {
      console.log(`Reset track numbers result: ${r}`)
      if (r > 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Info',
          detail: `Updated ${r} rows`
        });
        this.loadData();
      }
    })
  )

  displayUpdateDurationsForm = false;

  private updateDurationsSubject = new Subject<void>();

  updateDurations$ = this.updateDurationsSubject.asObservable().pipe(
    switchMap(() =>
      this.mediaFileService.getIdNameDurationTable(this.artifactId as number)
    ),
    tap(() => {
      this.displayUpdateDurationsForm = true
    })
  )

  displayImportTracksForm = false;

  private importTracksSubject: Subject<void> = new Subject();

  importTracks$ = this.importTracksSubject.asObservable().pipe(
    switchMap(() =>
      this.mediaFileService.getIdNameDurationTable(this.artifactId as number)
    ),
    tap(() => {
      this.displayImportTracksForm = true
    })
  );

  constructor(
    private router: Router,
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

  onImport(): void {
    this.displayImportTracksForm = false;
    this.loadData();
  }

  onUpdateDurations(): void {
    this.displayUpdateDurationsForm = false;
    this.loadData();
  }

  protected getEditData(item: Track): Observable<CRUDResult<[Track, MediaFile[], IdName[], IdTitle[]]>> {
    return forkJoin([
      iif(() => !!item.id,
        this.trackService.get(item.id as number),
        of({artifact: {id: this.artifactId} as Artifact, num: this.dataSize + 1} as Track)
      ),
      this.mediaFileService.getIdNameDurationTable(this.artifactId as number),
      this.artistService.getIdNameTable(this.artistTypeCode as string),
      iif (() => isArtifactTypeVideoWithProducts(this.artifactTypeId as number),
        this.dvProductService.getIdTitleTable(this.artifactTypeId as number).pipe(take(1)),
        of([])
        ),
    ]).pipe(
      map(v => {return {success: true, data: v as [Track, MediaFile[], IdName[], IdTitle[]]}}),
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
        this.isArtifactTypeVideoMusic = isArtifactTypeVideoMusic(this.artifactTypeId);
        this.isArtifactVideoWithProducts = isArtifactTypeVideoWithProducts(this.artifactTypeId);
      })
    )
  }

  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData();
  }

  displayProduct(item: Track) {
    console.log(`Display product: ${JSON.stringify(item)}`)
    this.showProductAction.next(item.dvProduct?.id as number);
  }

  resetTrackNumbers(event: any): void {
    event.preventDefault();
    this.confirmationService.confirm({
      message: "Track numbers will be reset. Are you sure?",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'reject',
      accept: () => {
        this.resetTrackNumbersSubject.next(this.artifactId as number);
      }
    })
  }

  showUpdateDurations(event: any): void {
    event.preventDefault();
    this.updateDurationsSubject.next();
  }

  showImportTracks(event: any): void {
    event.preventDefault();
    this.importTracksSubject.next();
  }

  onArtifactClick(event: any, item: Track, artifact: Artifact): void {
    event.preventDefault();
    console.log(`Navigating to artifact, artifactId=${item.id}, artifactTypeId: ${artifact.artifactType?.id}`)
    this.router.navigate(['/artifacts-video'],
      {queryParams: {artifactId: item.artifact?.id, artifactTypeId: artifact.artifactType?.id}})
  }

  sumTrackSize(data: Track[]): number {
    const uniqueData = [...
      new Map(data.map(
        v => [(v.mediaFiles?? []).length > 0 ? JSON.stringify(v.mediaFiles) : v.id as number, v.size?? 0]))
        .values()
    ]
    return uniqueData.reduce((a, b) => a + b, 0)
  }
}
