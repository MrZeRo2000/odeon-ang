import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {ArtistLyricsTableItem, ArtistLyricsText} from "../../model/artist-lyrics";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistLyricsService} from "../../service/artist-lyrics.service";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {catchError, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {MediaFileTableItem} from "../../model/media-file";
import {ActivatedRoute} from "@angular/router";
import {Biography} from "../../model/biography";

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
    private artistLyricsService: ArtistLyricsService,
  ) {
    super()
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

}
