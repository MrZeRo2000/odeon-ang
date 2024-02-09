import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Track} from "../model/track";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {CRUDService} from "./crud.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrackService extends CRUDService<Track>{

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "track")
  }

  getTable(artifactId: number): Observable<Array<Track>> {
    return this.restDataSource.getResponseData<Array<Track>>(`track/table/${artifactId}`)
  }

  getTableByProductId(dvProductId: number): Observable<Array<Track>> {
    return this.restDataSource.getResponseData<Array<Track>>(`track/table`, new HttpParams().set('dvProductId', dvProductId))
  }

  resetTrackNumbers(artifactId: number): Observable<true> {
    return this.restDataSource.postResponseData(`track/reset-track-numbers/${artifactId}`, null);
  }

}
