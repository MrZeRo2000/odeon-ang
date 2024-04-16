import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {MediaFile} from "../model/media-file";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable} from "rxjs";
import {TextInterface} from "../model/common";
import {HttpParams} from "@angular/common/http";

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

  getTableFiles(artifactId: number): Observable<Array<TextInterface>> {
    return this.restDataSource.getResponseData<Array<TextInterface>>(`${this.resourceName}/table-files/${artifactId}`)
  }

  getMediaFileAttributes(artifactId: number, mediaFileName: string): Observable<MediaFile> {
    const params = new HttpParams()
      .append('artifactId', artifactId)
      .append('mediaFileName', mediaFileName)
    return this.restDataSource.getResponseData<MediaFile>(`${this.resourceName}/file-attributes`, params)
  }
}
