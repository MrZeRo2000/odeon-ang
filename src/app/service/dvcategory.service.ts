import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {DVCategory} from "../model/dv-product";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable} from "rxjs";
import {SharedHandler} from "../utils/rxjs-utils";

@Injectable({
  providedIn: 'root'
})
export class DVCategoryService extends CRUDService<DVCategory>{

  public tableSharedHandler: SharedHandler<Array<DVCategory>> =
    new SharedHandler<Array<DVCategory>>(() => this.getTable());

  public table$ = this.tableSharedHandler.getSharedObservable();

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "dvcategory")
  }

  getTable(): Observable<Array<DVCategory>> {
    return this.restDataSource.getResponseData<Array<DVCategory>>(`${this.resourceName}/table`);
  }
}
