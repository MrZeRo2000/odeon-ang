import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {ArtistEditItem, ArtistTableItem} from "../model/artists";
import {catchError, map, Observable, share, shareReplay} from "rxjs";
import {Biography} from "../model/biography";
import {HttpParams} from "@angular/common/http";
import {IdName} from "../model/common";
import {CRUDService} from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends CRUDService<ArtistEditItem>{

  artistTable$ = this.getTable();

  private artistIdNameTable$: {
    [index: string]: Observable<IdName[]>
  } = {};

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "artist-category-details")
  }

  getTable(): Observable<Array<ArtistTableItem>> {
    return this.restDataSource.getResponseData<Array<ArtistTableItem>>("artist-category/all-with-artists");
  }

  getIdNameTable(artistTypeCode: string): Observable<Array<IdName>> {
    if (!this.artistIdNameTable$[artistTypeCode]) {
      let params: HttpParams = new HttpParams().append("artistTypeCode", artistTypeCode);
      this.artistIdNameTable$[artistTypeCode] = this.restDataSource
        .getResponseData<Array<IdName>>("artist/artists/table-id-name", params)
        .pipe(
          shareReplay(1)
        );
    }
    return this.artistIdNameTable$[artistTypeCode];
  }

  getArtistDetail(id: number): Observable<Biography> {
    return this.restDataSource.getResponseData<Biography>(`artist-detail/${id}`);
  }
}
