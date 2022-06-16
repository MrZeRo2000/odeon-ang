import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {ArtifactEditItem, ArtifactTableItem} from "../model/artifacts";
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

  deleteArtifact(id: number): Observable<true> {
    return this.restDataSource.deleteResponseData("artifact", id).pipe(
      map(() => true)
    );
  }

  createArtifact(data: ArtifactEditItem): Observable<ArtifactEditItem> {
    return this.restDataSource.postResponseData<ArtifactEditItem>("artifact", data);
  }

  updateArtifact(data: ArtifactEditItem): Observable<ArtifactEditItem> {
    return this.restDataSource.putResponseData<ArtifactEditItem>("artifact", data);
  }

  getArtifact(id: number): Observable<ArtifactEditItem> {
    return this.restDataSource.getResponseData<ArtifactEditItem>(`artifact/${id}`)
  }

}
