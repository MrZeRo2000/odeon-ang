import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {ArtifactEditItem, ArtifactTableItem} from "../model/artifacts";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {HttpParams} from "@angular/common/http";
import {CRUDService} from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class ArtifactService extends CRUDService<ArtifactEditItem>{

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "artifact")
  }

  getTable(artistTypeCode: string, artifactTypeCodes: Array<string>): Observable<Array<ArtifactTableItem>> {
    if (artifactTypeCodes.length > 0) {
      let params: HttpParams = new HttpParams().append("artistTypeCode", artistTypeCode);
      artifactTypeCodes.forEach(s => params = params.append("artifactTypeCodes", s));

      return this.restDataSource.getResponseData<Array<ArtifactTableItem>>(`${this.resourceName}/table`, params);
    } else {
      return of([])
    }
  }
}
