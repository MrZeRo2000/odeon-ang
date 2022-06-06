import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {catchError, Observable, of, Subject, switchMap, tap} from "rxjs";
import {MessageService} from "primeng/api";
import {Biography} from "../../model/biography";
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-artists-table',
  templateUrl: './artists-table.component.html',
  styleUrls: ['./artists-table.component.scss']
})
export class ArtistsTableComponent extends BaseComponent implements OnInit {

  displayArtistInfo = false;
  displayArtistName: string = "";

  errorObject: any = undefined;

  artistTable$ = this.artistService.artistTable$.pipe(
    catchError(err => {
      if (this.errorObject == undefined) {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artists: ${err.error?.message || err.message}`
        });
      }
      return [];
    })
  );

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

  constructor(private messageService: MessageService, private artistService: ArtistService) {
    super();
  }

  ngOnInit(): void {
  }

  displayArtistDetail(artistName: string, id: number) : void {
    this.displayArtistName = artistName;
    this.showArtistDetailAction.next(id);
  }

}
