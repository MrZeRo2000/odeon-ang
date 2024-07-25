import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArtistService} from "../../../service/artist.service";
import {catchError, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, FilterService, MessageService, PrimeNGConfig, SelectItem} from "primeng/api";
import {Biography} from "../../../model/biography";
import {Artist} from "../../../model/artists";
import {CRUDResult} from "../../../model/crud";
import {Router} from "@angular/router";
import {BaseCrudTableComponent} from "../../base/base-crud-table.component";

@Component({
  selector: 'app-artists-table',
  templateUrl: './artists-table.component.html',
  styleUrls: ['./artists-table.component.scss']
})
export class ArtistsTableComponent extends BaseCrudTableComponent<Artist, Artist> implements OnInit, AfterViewInit {

  displayArtistInfo = false;
  displayArtistName: string = "";

  data$? : Observable<Artist[]>;

  filterGenres: Array<SelectItem<string>> = [];
  filterStyles: Array<SelectItem<string>> = [];

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

  @ViewChild('dtc', { static: false})
  private tableContainerElement?: ElementRef;

  @ViewChild('dtcp', { static: false})
  private tableCaptionElement?: ElementRef;

  constructor(
    private router: Router,
    private filterService: FilterService,
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
        deleteConfirmation: event => `Are you sure that you want to delete <strong> ${event.data.artistName}</strong>?`,
        deleteErrorMessage: v => `Error deleting artist: ${v.data}`,
        editErrorMessage: v => `Error getting artist details: ${v.data}`
      }
      );
  }

  ngOnInit(): void {
    this.filterService.register(
      'filter_styles',
      (value: any, filter: any): boolean => {
        if (filter === undefined || filter === null || filter.length === 0) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return (value as string[]).filter(v => filter.indexOf(v) !== -1).length == filter.length;
      }
    )
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.data$ = this.getData().pipe(
      tap(v =>{
        this.filterGenres = [... new Set(v?.map(v => v.genre).filter(v => !!v))].sort().map(v => {return {label: v, value: v} as SelectItem});
        this.filterStyles = [... new Set(v?.map(v => v.styles).flat())].sort().map(v => {return {label: v, value: v} as SelectItem});
      })
      /*
      tap(() => {setTimeout(() => this.updateScrollHeight(), 0);}),
       */
    );
  }

  private getData(): Observable<Artist[]> {
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

  protected getEditData(item: Artist): Observable<CRUDResult<Artist>> {
    if (!item.id) {
      return of({success: true, data: {} as Artist});
    } else if (!item.detailId) {
      return of ({success: true, data: {
        id: item.id,
        artistName: item.artistName,
        artistType: item.artistType,
        artistBiography: '',
        genre: item.genre,
        styles: item.styles
      } as Artist});
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
            } as Artist}
          }
        ),
        catchError(err => {
          return of({success: false, data: err.error?.message || err.message});
        })
      )
    }
  }

  displayArtistDetail(item: Artist) : void {
    this.displayArtistName = item.artistName;
    this.showArtistDetailAction.next(item.detailId as number);
  }

  displayLyrics(item: Artist) : void {
    this.router.navigate([`lyrics/${item.id}`]).then();
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onArtifactsButton(event: any): void {
    event.preventDefault();
    this.router.navigate([`/artifacts-all`],{queryParams: {artistId: this.selectedItem?.id}}).then();
  }

  onTracksButton(event: any): void {
    event.preventDefault();
    this.router.navigate([`/tracks-all`],{queryParams: {artistId: this.selectedItem?.id}}).then();
  }


  /*
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScrollHeight();
  }

  private updateScrollHeight(): void {
    const windowHeight = window.innerHeight;
    const tableContainerTop = this.tableContainerElement?.nativeElement.offsetTop;
    const tableCaptionOffset = this.tableCaptionElement?.nativeElement.parentElement.offsetHeight;

    console.log(`WindowHeight=${windowHeight}, ContainterTop=${tableContainerTop}, CaptionOffset=${tableCaptionOffset}`);

    const containerHeight = windowHeight
      - tableContainerTop
      - tableCaptionOffset
      - parseFloat(getComputedStyle(document.documentElement).fontSize) / 2;
    this.scrollHeight = `${containerHeight}px`
  }

   */

}
