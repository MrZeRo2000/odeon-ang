import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ArtifactTableItem} from "../model/artifacts";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  constructor(private restDataSource: RestDataSourceService) { }

  getArtifactTable(artistTypeCode: string, artifactTypeCodes: Array<string>): Observable<Array<ArtifactTableItem>> {
    let params: HttpParams = new HttpParams().append("artistTypeCode", artistTypeCode);
    artifactTypeCodes.forEach(s => params = params.append("artifactTypeCodes", s));

    return this.restDataSource.getResponseData<Array<ArtifactTableItem>>("artifact/table", params);
  }
}
