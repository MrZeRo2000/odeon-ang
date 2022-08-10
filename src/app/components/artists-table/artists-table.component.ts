import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {catchError, iif, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {Biography} from "../../model/biography";
import {BaseComponent} from "../base/base.component";
import {ArtistEditItem, ArtistTableItem} from "../../model/artists";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {Router} from "@angular/router";
import {BaseTableComponent} from "../base/base-table.component";

@Component({
  selector: 'app-artists-table',
  templateUrl: './artists-table.component.html',
  styleUrls: ['./artists-table.component.scss']
})
export class ArtistsTableComponent extends BaseTableComponent<ArtistTableItem, ArtistEditItem> implements OnInit, AfterViewInit {

  displayArtistInfo = false;
  displayArtistName: string = "";

  data$? : Observable<ArtistTableItem[]>;

  private showArtistDetailAction: Subject<number> = new Subject();

  artistDetail$ = this.showArtistDetailAction.pipe(
    tap(v => {console.log(`Show artist action: ${v}`)}),
    switchMap( v => {
      return this.artistService.getArtistDetail(v).pipe(
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting artist details: ${err.error?.message || err.message}`
          })
          return of({} as Biography);
        }),
        tap(b => {this.displayArtistInfo = !!b.biography;})
      )
    })
  )

  constructor(
    private router: Router,
    confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    messageService: MessageService,
    private artistService: ArtistService
  ) {
    super(
      messageService,
      confirmationService,
      artistService,
      {
        deleteConfirmation: "`Are you sure that you want to delete <strong> ${event.data.artistName}</strong>?`",
        deleteErrorMessage: "`Error deleting artist: ${v.data}`",
        editErrorMessage: "`Error getting artist details: ${v.data}`"
      }
      );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.data$ = this.getData();
  }

  private getData(): Observable<ArtistTableItem[]> {
    return this.artistService.artistTable$.pipe(
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artists: ${err.error?.message || err.message}`
        });
        return [];
      }),
      map( v => v.map(v => {
        v.isGenre = !!v.genre;
        v.isDetail = !!v.detailId;
        return v;
      }))
    );
  }

  protected getEditData(item: ArtistTableItem): Observable<CRUDResult<ArtistEditItem>> {
    if (!item.id) {
      return of({success: true, data: {} as ArtistEditItem});
    } else if (!item.detailId) {
      return of ({success: true, data: {
        id: item.id,
        artistName: item.artistName,
        artistType: item.artistType,
        artistBiography: '',
        genre: item.genre,
        styles: item.styles
      } as ArtistEditItem});
    } else {
      return this.artistService.getArtistDetail(item.detailId as number).pipe(
        map(d => {
            return {success: true, data: {
              id: item.id,
              artistName: item.artistName,
              artistType: item.artistType,
              artistBiography: d.biography,
              genre: item.genre,
              styles: item.styles
            } as ArtistEditItem}
          }
        ),
        catchError(err => {
          return of({success: false, data: err.error?.message || err.message});
        })
      )
    }
  }

  displayArtistDetail(item: ArtistTableItem) : void {
    this.displayArtistName = item.artistName;
    this.showArtistDetailAction.next(item.detailId as number);
  }

  displayLyrics(item: ArtistTableItem) : void {
    this.router.navigate([`lyrics/${item.id}`]).then();
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

}
