import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {CRUDOperation, CRUDResult} from "../../model/crud";

export class BaseTableComponent<T> {

  errorObject: any = undefined;

  displayForm = false;

  globalFilterValue = '';

  selectedItem?: T;

  protected deleteSubject: Subject<CRUDOperation<T>> = new Subject<CRUDOperation<T>>();

  protected editSubject: Subject<T> = new Subject();

  constructor() { }

  savedEditData(event: any): void {
    this.displayForm = false;
  }
}
