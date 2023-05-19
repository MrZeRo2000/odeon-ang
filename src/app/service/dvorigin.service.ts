import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {DVOrigin} from "../model/dv-product";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable} from "rxjs";
import {SharedHandler} from "../utils/rxjs-utils";

@Injectable({
  providedIn: 'root'
})
export class DVOriginService extends CRUDService<DVOrigin>{

  public tableSharedHandler = new SharedHandler<Array<DVOrigin>>(() => this.getTable());

  public table$ = this.tableSharedHandler.getSharedObservable();

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "dvorigin")
  }

  getTable(): Observable<Array<DVOrigin>> {
    return this.restDataSource.getResponseData<Array<DVOrigin>>(`${this.resourceName}/table`);
  }
}
