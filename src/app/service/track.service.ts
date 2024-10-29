import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RowsAffected, Track, TrackDurationsUserUpdate, TrackDVTypeUserUpdate} from "../model/track";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {CRUDService} from "./crud.service";
import { HttpParams } from "@angular/common/http";

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

  getTableByOptional(artifactTypeIds: number[] | null | undefined, artistIds: number[] | null | undefined): Observable<Array<Track>> {
    let params: HttpParams = new HttpParams();
    if (!!artifactTypeIds && artifactTypeIds.length > 0) {
      params = params.appendAll({"artifactTypeIds": artifactTypeIds});
    }
    if (!!artistIds && artistIds.length > 0) {
      params = params.appendAll({"artistIds": artistIds});
    }
    return this.restDataSource.getResponseData<Array<Track>>(`${this.resourceName}/table-by-optional`, params);
  }

  getTableByProductId(dvProductId: number): Observable<Array<Track>> {
    return this.restDataSource.getResponseData<Array<Track>>(`track/table`, new HttpParams().set('dvProductId', dvProductId))
  }

  resetTrackNumbers(artifactId: number): Observable<RowsAffected> {
    return this.restDataSource.postResponseData<RowsAffected>(`track/reset-track-numbers/${artifactId}`, null);
  }

  updateVideoTypes(videoTypes: TrackDVTypeUserUpdate): Observable<RowsAffected> {
    return this.restDataSource.postResponseData<RowsAffected>(`track/update-track-video-types`, videoTypes);
  }

  updateTrackDurations(trackDurations: TrackDurationsUserUpdate): Observable<RowsAffected> {
    return this.restDataSource.postResponseData<RowsAffected>(`track/update-track-durations`, trackDurations);
  }
}
