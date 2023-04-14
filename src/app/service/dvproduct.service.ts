import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {IdTitle} from "../model/common";
import {HttpParams} from "@angular/common/http";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {DVProduct} from "../model/dv-product";

@Injectable({
  providedIn: 'root'
})
export class DVProductService {

  private dvProductIdNameTable$: {
    [index: number]: Observable<Array<IdTitle>>
  } = {};

  private dvProductTable$: {
    [index: number]: Observable<Array<DVProduct>>
  } = {};

  private refreshTable$ = new BehaviorSubject<void>(undefined);

  public refreshTable(): void {
    this.refreshTable$.next(undefined);
  }

  constructor(private restDataSource: RestDataSourceService) { }

  getIdTitleTable(artifactType: number): Observable<Array<IdTitle>> {
    if (!artifactType) {
      return of([])
    } else if (!this.dvProductIdNameTable$[artifactType]) {
      const params: HttpParams = new HttpParams().append("artifactTypeId", artifactType);
      this.dvProductIdNameTable$[artifactType] = this.refreshTable$.pipe(
        tap(() => {console.log('Loading dvProduct idTitleTable')}),
        switchMap(() => this.restDataSource.getResponseData<Array<IdTitle>>("dvproduct/dvproducts/table-id-title", params)),
        shareReplay(1)
      )
    }

    return this.dvProductIdNameTable$[artifactType];
  }

  getTable(artifactType: number): Observable<Array<DVProduct>> {
    if (!artifactType) {
      return of([])
    } else if (!this.dvProductTable$[artifactType]) {
      const params: HttpParams = new HttpParams().append("artifactTypeId", artifactType);
      this.dvProductTable$[artifactType] = this.refreshTable$.pipe(
        tap(() => {console.log('Loading dvProduct table')}),
        switchMap(() => this.restDataSource.getResponseData<Array<DVProduct>>("dvproduct/dvproducts/table", params)),
        shareReplay(1)
      )
    }

    return this.dvProductTable$[artifactType];
  }
}
