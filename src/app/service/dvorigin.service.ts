import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {DVOrigin} from "../model/dv-product";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {BehaviorSubject, Observable, share, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DVOriginService extends CRUDService<DVOrigin>{

  private refreshTable$ = new BehaviorSubject<void>(undefined);

  public refreshTable(): void {
    this.refreshTable$.next(undefined);
  }

  public dvOriginTable$: Observable<Array<DVOrigin>> = this.refreshTable$.pipe(
    tap(() => {console.log('Loading dvOrigin table')}),
    switchMap(() => this.getTable()),
    share({resetOnComplete: true, resetOnError: true, resetOnRefCountZero: true})
  );

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "dvorigin")
  }

  getTable(): Observable<Array<DVOrigin>> {
    return this.restDataSource.getResponseData<Array<DVOrigin>>(`${this.resourceName}/table`);
  }
}
