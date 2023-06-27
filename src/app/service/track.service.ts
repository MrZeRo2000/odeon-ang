import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TrackEditItem, TrackTableItem} from "../model/track";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {CRUDService} from "./crud.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrackService extends CRUDService<TrackEditItem>{

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "track")
  }

  getTable(artifactId: number): Observable<Array<TrackTableItem>> {
    return this.restDataSource.getResponseData<Array<TrackTableItem>>(`track/table/${artifactId}`)
  }

  getTableByProductId(dvProductId: number): Observable<Array<TrackTableItem>> {
    return this.restDataSource.getResponseData<Array<TrackTableItem>>(`track/table`, new HttpParams().set('dvProductId', dvProductId))
  }

}
