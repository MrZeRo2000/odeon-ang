import { Component, OnInit } from '@angular/core';
import {BaseCrudTableComponent} from "../../base/base-crud-table.component";
import {ArtistLyricsEditItem, ArtistLyricsTableItem, ArtistLyricsText} from "../../../model/artist-lyrics";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistLyricsService} from "../../../service/artist-lyrics.service";
import {CRUDResult} from "../../../model/crud";
import {catchError, forkJoin, iif, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {IdName} from "../../../model/common";
import {ArtistService} from "../../../service/artist.service";

export interface NameInterface {
  name: string
}

@Component({
    selector: 'app-artist-lyrics-table',
    templateUrl: './artist-lyrics-table.component.html',
    styleUrls: ['./artist-lyrics-table.component.scss'],
    standalone: false
})
export class ArtistLyricsTableComponent extends BaseCrudTableComponent<ArtistLyricsTableItem, [ArtistLyricsEditItem, IdName[]]> implements OnInit {
  private artistId?: number;

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
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private artistService: ArtistService,
    private artistLyricsService: ArtistLyricsService,
  ) {
    super(
      messageService,
      confirmationService,
      artistLyricsService,
      {
        deleteConfirmation: event => `Are you sure that you want to delete <strong> ${event.data.artistName} - ${event.data.title} </strong>?`,
        deleteErrorMessage: v => `Error deleting artist lyrics: ${v.data}`,
        editErrorMessage: v => `Error getting lyrics details: ${v.data}`
      }
    )
  }

  protected loadData(): void {
    this.data$ = this.getData();
  }

  ngOnInit(): void {
    this.artistId = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
    console.log(`Routes artistId: ${this.artistId} ${!!this.artistId}`)
    this.loadData();
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
      this.artistService.getIdNameTable('A')
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
    return this.artistService.getIdNameTable('A').pipe(
      map(v => {return {success: true, data:[{}, v] as [ArtistLyricsEditItem, IdName[]]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  protected override getEditData(item: ArtistLyricsTableItem): Observable<CRUDResult<[ArtistLyricsEditItem, IdName[]]>> {
    return iif(() => !!item.id,
      this.getWithArtists(item),
      this.getNew(item))
  }
}
