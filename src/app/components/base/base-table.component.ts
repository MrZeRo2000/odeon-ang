import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, Subject} from "rxjs";
import {CRUDOperation, CRUDResult} from "../../model/crud";
import {CRUDService} from "../../service/crud.service";
import {MediaFileEditItem} from "../../model/media-file";

export class BaseTableComponent<T> {

  errorObject: any = undefined;

  displayForm = false;

  globalFilterValue = '';

  selectedItem?: T;

  protected deleteSubject: Subject<CRUDOperation<T>> = new Subject<CRUDOperation<T>>();

  protected editSubject: Subject<T> = new Subject();

  constructor(protected dataService: CRUDService<any>) { }

  savedEditData(event: any): void {
    this.displayForm = false;
  }

  protected delete(id: number): Observable<CRUDResult<void>> {
    return this.dataService.delete(id).pipe(
      map(_ => {return {success: true} as CRUDResult<void>}),
      catchError(err => of({success: false, data: err.error?.message || err.message}))
    )
  }

  protected get(id: number): Observable<CRUDResult<T>> {
    return this.dataService.get(id).pipe(
      map(v => {return {success: true, data: v}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

}
