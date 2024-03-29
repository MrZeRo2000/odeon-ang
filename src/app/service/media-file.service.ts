import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {MediaFile} from "../model/media-file";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaFileService extends CRUDService<MediaFile>{

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "media-file")
  }

  getTable(artifactId: number): Observable<Array<MediaFile>> {
    return this.restDataSource.getResponseData<Array<MediaFile>>(`${this.resourceName}/table/${artifactId}`)
  }

  getIdNameDurationTable(artifactId: number): Observable<Array<MediaFile>> {
    return this.restDataSource.getResponseData<Array<MediaFile>>(`${this.resourceName}/table-id-name-duration/${artifactId}`)
  }

}
