import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {ArtistTableItem} from "../model/artists";
import {catchError, Observable} from "rxjs";
import {Biography} from "../model/biography";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artistTable$ = this.getArtistTable();

  constructor(private restDataSource: RestDataSourceService) { }

  getArtistTable(): Observable<Array<ArtistTableItem>> {
    return this.restDataSource.getResponseData<Array<ArtistTableItem>>("artist-category/all-with-artists");
  }

  getArtistDetail(id: number): Observable<Biography> {
    return this.restDataSource.getResponseData<Biography>(`artist-detail/${id}`);
  }
}
