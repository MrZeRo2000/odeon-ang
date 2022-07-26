import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {ArtistLyricsEditItem, ArtistLyricsTableItem} from "../model/artist-lyrics";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtistLyricsService extends CRUDService<ArtistLyricsEditItem> {

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "artist-lyrics")
  }

  getTable(): Observable<Array<ArtistLyricsTableItem>> {
    return this.restDataSource.getResponseData<Array<ArtistLyricsTableItem>>(`${this.resourceName}/table`);
  }
}
