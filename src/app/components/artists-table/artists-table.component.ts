import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {catchError, Observable, of, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {Biography} from "../../model/biography";
import {BaseComponent} from "../base/base.component";
import {ArtistTableItem} from "../../model/artists";
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

  artistTable$ = this.getArtistTable({action: CRUDAction.EA_READ} as CRUDOperation<ArtistTableItem>)

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
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private artistService: ArtistService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('On init');
    //setTimeout(() => this.crudOperationAction.next({action: CRUDAction.EA_READ} as CRUDOperation<ArtistTableItem>), 100)

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
        //Actual logic to perform a confirmation
        //this.startProcess(processorAction);
        //alert('Accepted')
        //this.crudOperationAction.next({action: CRUDAction.EA_DELETE, data: item})
        this.artistTable$ = this.getArtistTable({action: CRUDAction.EA_DELETE, data: item});
      }
    });
  }

  newArtist(): void {
    this.displayForm = true;
  }

  getArtistTable(operation: CRUDOperation<ArtistTableItem>): Observable<ArtistTableItem[]> {
    return of(operation).pipe(
      switchMap(v => {
        if (v.action == CRUDAction.EA_DELETE) {
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
            })
          )
        }
      )
    )
  }

}
