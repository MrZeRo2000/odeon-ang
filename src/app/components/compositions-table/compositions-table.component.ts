import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, forkJoin, iif, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {CompositionEditItem, CompositionTableItem} from "../../model/composition";
import {CompositionService} from "../../service/composition.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtifactEditItem, isArtifactTypeMusic} from "../../model/artifacts";
import {ArtifactService} from "../../service/artifact.service";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {DecimalPipe} from "@angular/common";
import {BaseTableComponent} from "../base/base-table.component";
import {MediaFileService} from "../../service/media-file.service";
import {IdName} from "../../model/common";
import {ArtistService} from "../../service/artist.service";

@Component({
  selector: 'app-compositions-table',
  templateUrl: './compositions-table.component.html',
  styleUrls: ['./compositions-table.component.scss']
})
export class CompositionsTableComponent extends BaseTableComponent<CompositionTableItem, [CompositionEditItem, IdName[], IdName[]]> implements OnInit {
  private artifactId?: number;

  artistTypeCode: string = 'A';
  artifactTypeId?: number;
  isArtifactTypeMusic = true;

  dataSize = 0;

  data$?: Observable<[CompositionTableItem[], ArtifactEditItem]>;

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

  constructor(
    private route: ActivatedRoute,
    private decimalPipe: DecimalPipe,
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private compositionService: CompositionService,
    private artifactService: ArtifactService,
    private mediaFileService: MediaFileService,
    private artistService: ArtistService,
  ) {
    super(
      messageService,
      confirmationService,
      compositionService,
      {
        deleteConfirmation: "`Are you sure that you want to delete <strong> ${this.decimalPipe.transform(event.data.num, '2.0-0')} ${event.data.title}</strong>?`",
        deleteErrorMessage: "`Error deleting composition: ${v.data}`",
        editErrorMessage: "`Error getting composition details: ${v.data}`"
      }

    );
  }

  protected loadData(): void {
    if (this.artifactId) {
      this.data$ = this.getData(this.artifactId);
    }
  }

  protected getEditData(item: CompositionTableItem): Observable<CRUDResult<[CompositionEditItem, IdName[], IdName[]]>> {
    return forkJoin([
      iif(() => !!item.id,
        this.compositionService.get(item.id),
        of({artifactId: this.artifactId, num: this.dataSize + 1})
      ),
      this.mediaFileService.getIdNameTable(this.artifactId as number),
      this.artistService.getIdNameTable(this.artistTypeCode as string)
    ]).pipe(
      map(v => {return {success: true, data: v as [CompositionEditItem, IdName[], IdName[]]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }


  ngOnInit(): void {
    this.artifactId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    console.log(`Routed with id=${this.artifactId}`);
    this.loadData();
  }

  private getData(id: number): Observable<[CompositionTableItem[], ArtifactEditItem]> {
    return forkJoin([
      this.getTable(id),
      this.getArtifact(id),
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
      }),
      tap(v => {
        console.log(`Got artistTypeCode: ${v.artistTypeCode}, artifactTypeId: ${v.artifactTypeId}`);
        this.artistTypeCode = v.artistTypeCode;
        this.artifactTypeId = v.artifactTypeId;
        this.isArtifactTypeMusic = isArtifactTypeMusic(this.artifactTypeId);
      })
    )
  }

  private getWithMediaFiles(id: number): Observable<CRUDResult<[CompositionEditItem, IdName[]]>> {
    return forkJoin([
      this.compositionService.get(id),
      this.mediaFileService.getIdNameTable(this.artifactId as number)
    ]).pipe(
      map(v => {return {success: true, data: v as [CompositionEditItem, IdName[]]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  private getNew(id: number): Observable<CRUDResult<[CompositionEditItem, IdName[]]>> {
    return this.mediaFileService.getIdNameTable(this.artifactId as number).pipe(
      map(v => {return {success: true, data:[{artifactId: this.artifactId, num: this.dataSize + 1}, v] as [CompositionEditItem, IdName[]]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData(this.artifactId as number);
  }
}
