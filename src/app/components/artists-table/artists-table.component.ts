import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {catchError} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-artists-table',
  templateUrl: './artists-table.component.html',
  styleUrls: ['./artists-table.component.scss']
})
export class ArtistsTableComponent implements OnInit {

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

  constructor(private messageService: MessageService, private artistService: ArtistService) { }

  ngOnInit(): void {
  }

}
