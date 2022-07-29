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

  artistTable$ = this.getArtistTable();

  artistIdNameTable$ = this.getIdNameTable();

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "artist-category-details")
  }

  getArtistTable(): Observable<Array<ArtistTableItem>> {
    return this.restDataSource.getResponseData<Array<ArtistTableItem>>("artist-category/all-with-artists");
  }

  getIdNameTable(): Observable<Array<IdName>> {
    if (!this.artistIdNameTable$) {
      return this.restDataSource.getResponseData<Array<IdName>>("artist/artists/table-id-name").pipe(
        shareReplay(1)
      );
    } else {
      return this.artistIdNameTable$;
    }
  }

  getArtistDetail(id: number): Observable<Biography> {
    return this.restDataSource.getResponseData<Biography>(`artist-detail/${id}`);
  }
}
