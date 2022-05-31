import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {ArtistTableItem} from "../model/artists";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artistTable$ = this.getArtistTable();

  constructor(private restDataSource: RestDataSourceService) { }

  getArtistTable(): Observable<Array<ArtistTableItem>> {
    return this.restDataSource.getResponseData<Array<ArtistTableItem>>("artist-category/all-with-artists");
  }
}
