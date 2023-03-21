import { Injectable } from '@angular/core';
import {Observable, of, shareReplay} from "rxjs";
import {IdName, IdTitle} from "../model/common";
import {HttpParams} from "@angular/common/http";
import {RestDataSourceService} from "../data-source/rest-data-source.service";

@Injectable({
  providedIn: 'root'
})
export class DVProductService {

  private dvProductIdNameTable$: {
    [index: number]: Observable<Array<IdTitle>>
  } = {};

  constructor(private restDataSource: RestDataSourceService) { }

  getIdTitleTable(artifactType: number): Observable<Array<IdTitle>> {
    if (!artifactType) {
      return of([])
    } else if (!this.dvProductIdNameTable$[artifactType]) {
      const params: HttpParams = new HttpParams().append("artifactTypeId", artifactType);
      this.dvProductIdNameTable$[artifactType] = this.restDataSource
        .getResponseData<Array<IdTitle>>("dvproduct/dvproducts/table-id-title", params)
        .pipe(
          shareReplay(1)
        );
    }

    return this.dvProductIdNameTable$[artifactType];
  }
}
