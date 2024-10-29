import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {IdTitle, IdTitleOriginalTitle, TextInterface} from "../model/common";
import { HttpParams } from "@angular/common/http";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {DVProduct} from "../model/dv-product";
import {CRUDService} from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class DVProductService extends CRUDService<DVProduct> {

  private dvProductIdNameTable$: {
    [index: number]: Observable<Array<IdTitle>>
  } = {};

  private dvProductIdNameOriginalTitleTable$: {
    [index: number]: Observable<Array<IdTitleOriginalTitle>>
  } = {};

  private dvProductTable$: {
    [index: number]: Observable<Array<DVProduct>>
  } = {};

  private refreshTable$ = new BehaviorSubject<void>(undefined);

  public refreshTable(): void {
    this.refreshTable$.next(undefined);
  }

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "dvproduct")
  }

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

  getIdTitleOriginalTitleTable(artifactType: number): Observable<Array<IdTitleOriginalTitle>> {
    if (!artifactType) {
      return of([])
    } else if (!this.dvProductIdNameOriginalTitleTable$[artifactType]) {
      const params: HttpParams = new HttpParams().append("artifactTypeId", artifactType);
      this.dvProductIdNameOriginalTitleTable$[artifactType] = this.refreshTable$.pipe(
        tap(() => {console.log('Loading dvProduct idTitleOriginalTitleTable')}),
        switchMap(() => this.restDataSource.getResponseData<Array<IdTitleOriginalTitle>>("dvproduct/dvproducts/table-id-title-original-title", params)),
        shareReplay(1)
      )
    }

    return this.dvProductIdNameOriginalTitleTable$[artifactType];
  }

  getTable(artifactType: number): Observable<Array<DVProduct>> {
    if (!artifactType) {
      return of([])
    } else if (!this.dvProductTable$[artifactType]) {
      const params: HttpParams = new HttpParams().append("artifactTypeId", artifactType);
      this.dvProductTable$[artifactType] = this.refreshTable$.pipe(
        //tap(() => {console.log('Loading dvProduct table')}),
        switchMap(() => this.restDataSource.getResponseData<Array<DVProduct>>("dvproduct/dvproducts/table", params)),
        shareReplay(1)
      )
    } else {
      //console.log('dvProduct table found, no need to load')
    }

    return this.dvProductTable$[artifactType];
  }

  getDescription(id: number): Observable<TextInterface> {
    if (!id) {
      return of({} as TextInterface)
    } else {
      return this.restDataSource.getResponseData<TextInterface>(`dvproduct/description/${id}`)
    }
  }

  getNotes(id: number): Observable<TextInterface> {
    if (!id) {
      return of({} as TextInterface)
    } else {
      return this.restDataSource.getResponseData<TextInterface>(`dvproduct/notes/${id}`)
    }
  }
}
