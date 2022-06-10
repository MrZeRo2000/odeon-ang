import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {catchError, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {Biography} from "../../model/biography";
import {BaseComponent} from "../base/base.component";
import {ArtistEditItem, ArtistTableItem} from "../../model/artists";
import {CRUDAction, CRUDOperation} from "../../model/crud";

@Component({
  selector: 'app-artists-table',
  templateUrl: './artists-table.component.html',
  styleUrls: ['./artists-table.component.scss']
})
export class ArtistsTableComponent extends BaseComponent implements OnInit, AfterViewInit {

  displayArtistInfo = false;
  displayArtistName: string = "";

  displayForm = false;

  errorObject: any = undefined;

  private crudOperationAction: Subject<CRUDOperation<ArtistTableItem>> = new Subject();

  artistTable$ = this.getArtistTable({action: CRUDAction.EA_READ} as CRUDOperation<ArtistTableItem | ArtistEditItem>)

  private showArtistDetailAction: Subject<number> = new Subject();
  private artistEditAction: Subject<ArtistTableItem> = new Subject();

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

  artistEdit$ = this.artistEditAction.pipe(
    switchMap( v => {
      if (Object.keys(v).length === 0) {
        return of({} as ArtistEditItem);
      } else if (!v.detailId) {
        return of ({
          id: v.id,
          artistName: v.artistName,
          artistType: v.artistType,
          artistBiography: '',
          genre: v.genre,
          styles: v.styles
        } as ArtistEditItem);
      } else {
        return this.artistService.getArtistDetail(v.detailId as number).pipe(
          map(d => {return {
            id: v.id,
            artistName: v.artistName,
            artistType: v.artistType,
            artistBiography: d.biography,
            genre: v.genre,
            styles: v.styles
          } as ArtistEditItem}),
          catchError(err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error getting artist details: ${err.error?.message || err.message}`
            });
            return of({} as ArtistEditItem);
          })
        )
      }
    }),
    tap(v => {console.log(`Obtained artistEdit: ${JSON.stringify(v)}`); this.displayForm = v.id !== -1;})
  )

  constructor(
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private artistService: ArtistService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.crudOperationAction.next({action: CRUDAction.EA_READ} as CRUDOperation<ArtistTableItem>);
  }

  displayArtistDetail(item: ArtistTableItem) : void {
    this.displayArtistName = item.artistName;
    this.showArtistDetailAction.next(item.detailId as number);
  }

  deleteArtist(item: ArtistTableItem) : void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <strong> ${item.artistName}</strong>?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.artistTable$ = this.getArtistTable({action: CRUDAction.EA_DELETE, data: item});
      }
    });
  }

  editArtist(item: ArtistTableItem) : void {
    this.artistEditAction.next(item);
  }

  newArtist(): void {
    this.artistEditAction.next({} as ArtistTableItem);
  }

  saveArtist(item: ArtistEditItem): void {
    console.log(`Saving ${JSON.stringify(item)}`);
    //const action = item.id ? CRUDAction.EA_UPDATE: CRUDAction.EA_CREATE;
    this.artistTable$ = this.getArtistTable({action: CRUDAction.EA_READ, data: item});
  }

  getArtistTable(operation: CRUDOperation<ArtistTableItem | ArtistEditItem>): Observable<ArtistTableItem[]> {
    return of(operation).pipe(
      switchMap(v => {
        if ((v.action == CRUDAction.EA_DELETE) && !!v.data.id) {
          return this.artistService.deleteArtist(v.data.id).pipe(
            catchError(err => {
                this.errorObject = err;
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: `Error deleting artist: ${err.error?.message || err.message}`
                });
              return of(undefined);
            })
          );
        } else if (v.action === CRUDAction.EA_CREATE) {
          return this.artistService.createArtist(v.data as ArtistEditItem).pipe(
            catchError(err => {
              this.errorObject = err;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Error creating artist: ${err.error?.message || err.message}`
              });
              return of(undefined);
            })
          );
        } else {
          return of(CRUDAction.EA_READ);
        }
      }),
      switchMap(v => {
          console.log(`Requesting with ${v}`);
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
          )
        }
      ),
      tap(v => console.log(`Returned ${JSON.stringify(v)}`))
    )
  }

}
