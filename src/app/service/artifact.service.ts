import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Artifact} from "../model/artifacts";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {HttpParams} from "@angular/common/http";
import {CRUDService} from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class ArtifactService extends CRUDService<Artifact>{

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "artifact")
  }

  getTable(artistTypeCode: string, artifactTypeCodes: Array<string>): Observable<Array<Artifact>> {
    if (artifactTypeCodes.length > 0) {
      let params: HttpParams = new HttpParams().append("artistTypeCode", artistTypeCode);
      artifactTypeCodes.forEach(s => params = params.append("artifactTypeCodes", s));

      return this.restDataSource.getResponseData<Array<Artifact>>(`${this.resourceName}/table`, params);
    } else {
      return of([])
    }
  }

  getTableByOptional(artifactTypeId?: number, artistId?: number): Observable<Array<Artifact>> {
    let params: HttpParams = new HttpParams();
    if (artifactTypeId) {
      params = params.append("artifactTypeId", artifactTypeId);
    }
    if (artistId) {
      params = params.append("artistId", artistId);
    }
    return this.restDataSource.getResponseData<Array<Artifact>>(`${this.resourceName}/table-by-optional`, params);
  }
}
