import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {DVCategory} from "../model/dv-product";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {BehaviorSubject, Observable, shareReplay, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DVCategoryService extends CRUDService<DVCategory>{

  private refreshTable$ = new BehaviorSubject<void>(undefined);

  public refreshTable(): void {
    this.refreshTable$.next(undefined);
  }

  public table$: Observable<Array<DVCategory>> = this.refreshTable$.pipe(
    tap(() => {console.log('Loading dvCategory table')}),
    switchMap(() => this.getTable()),
    shareReplay(1)
  );

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "dvcategory")
  }

  getTable(): Observable<Array<DVCategory>> {
    return this.restDataSource.getResponseData<Array<DVCategory>>(`${this.resourceName}/table`);
  }
}
