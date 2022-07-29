import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {ArtistLyricsEditItem, ArtistLyricsTableItem, ArtistLyricsText} from "../../model/artist-lyrics";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistLyricsService} from "../../service/artist-lyrics.service";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {catchError, forkJoin, iif, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {MediaFileEditItem, MediaFileTableItem} from "../../model/media-file";
import {ActivatedRoute} from "@angular/router";
import {Biography} from "../../model/biography";
import {CompositionEditItem} from "../../model/composition";
import {IdName} from "../../model/common";
import {ArtistService} from "../../service/artist.service";

export interface NameInterface {
  name: string
}

@Component({
  selector: 'app-artist-lyrics-table',
  templateUrl: './artist-lyrics-table.component.html',
  styleUrls: ['./artist-lyrics-table.component.scss']
})
export class ArtistLyricsTableComponent extends BaseTableComponent<ArtistLyricsTableItem> implements OnInit {
  private artistId?: number;

  CRUDAction = CRUDAction;

  displayArtistLyricsText = false;

  data$?: Observable<[Array<ArtistLyricsTableItem>, NameInterface[]]>;

  deleteAction$ = this.deleteSubject.asObservable().pipe(
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
          detail: `Error deleting artist lyrics: ${v.data}`
        });
      }
    })
  );

  editAction$ = this.editSubject.asObservable().pipe(
    switchMap(v =>
      iif(() => !!v.id,
        this.getWithArtists(v),
        this.getNew(v))
    ),
    tap(v => {
      if (v.success) {
        this.displayForm = v.success
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting lyrics details: ${v.data}`
        });
      }
    }),
    map(v => v.data as [ArtistLyricsEditItem, IdName[]])
  );

  private showArtistLyricsTextAction: Subject<ArtistLyricsTableItem> = new Subject();

  artistLyricsText$ = this.showArtistLyricsTextAction.pipe(
    switchMap(v => {
      return this.artistLyricsService.getLyricsText(v.id).pipe(
        map(t => {
          t.artistName = v.artistName;
          t.title = v.title;
          return t;
        }),
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting artist lyrics by id ${v.id}: ${err.error?.message || err.message}`
          })
          return of({} as ArtistLyricsText);
        }),
        tap(v => {
          this.displayArtistLyricsText = !!v.text;
          console.log(`Got lyrics info: ${JSON.stringify(v)}`)
        })
      )
    })
  );

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private artistService: ArtistService,
    private artistLyricsService: ArtistLyricsService,
  ) {
    super(artistLyricsService)
  }

  ngOnInit(): void {
    this.artistId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    console.log(`Routes artistId: ${this.artistId} ${!!this.artistId}`)
    this.data$ = this.getData();
  }

  private getData(): Observable<[Array<ArtistLyricsTableItem>, NameInterface[]]> {
    const table$: Observable<Array<ArtistLyricsTableItem>> = !!this.artistId ?
      this.artistLyricsService.getTableByArtistId(this.artistId) :
      this.artistLyricsService.getTable();

    return table$.pipe(
      map(v => {
        return [
          v,
          [... new Set(v.map(v => v.artistName))].map(v => <NameInterface>{name: v})] as [Array<ArtistLyricsTableItem>, NameInterface[]];
      }),
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading lyrics`
        });
        return of([[], []] as [Array<ArtistLyricsTableItem>, NameInterface[]]);
      })
    );
  }

  crudEvent(event: any): void {
    if (event.action === CRUDAction.EA_DELETE) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete <strong> ${event.data.artistName} - ${event.data.title} </strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteSubject.next({action: event.action, data: event.data})
        }
      });
    } else if (event.action === CRUDAction.EA_CREATE) {
      this.editSubject.next({} as ArtistLyricsTableItem)
    } else if (event.action === CRUDAction.EA_UPDATE) {
      this.editSubject.next(event.data)
    }
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  displayLyrics(event: any, item: ArtistLyricsTableItem): void {
    event.preventDefault();
    console.log(`Display lyrics for ${JSON.stringify(item)}`);
    this.showArtistLyricsTextAction.next(item);
  }

  private getWithArtists(item: ArtistLyricsTableItem): Observable<CRUDResult<[ArtistLyricsEditItem, IdName[]]>> {
    return forkJoin([
      this.artistLyricsService.get(item.id),
      this.artistService.getIdNameTable()
    ]).pipe(
      map(v => {
        v[0].artistName = item.artistName;
        return {success: true, data: v as [ArtistLyricsEditItem, IdName[]]}
      }),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  private getNew(item: ArtistLyricsTableItem): Observable<CRUDResult<[ArtistLyricsEditItem, IdName[]]>> {
    return this.artistService.getIdNameTable().pipe(
      map(v => {return {success: true, data:[{}, v] as [ArtistLyricsEditItem, IdName[]]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  override savedEditData(event: any) {
    super.savedEditData(event);
    this.data$ = this.getData();
  }
}
