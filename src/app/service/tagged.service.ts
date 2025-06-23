import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Tagged} from "../model/tag";
import {catchError, Observable, of, switchMap} from "rxjs";
import {IdName} from "../model/common";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class TaggedService extends CRUDService<Tagged> {

  private _taggedResourceName: string = ""

  get taggedResourceName(): string {
    return this._taggedResourceName;
  }

  set taggedResourceName(value: string) {
    this._taggedResourceName = value;
  }

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "update-tags")
  }

  getTable(): Observable<Array<IdName>> {
    return this.restDataSource.getResponseData<Array<IdName>>(`tag/table`)
  }

  getTags(messageService: MessageService): Observable<Array<string>> {
    return this.getTable().pipe(
      switchMap(v => of(v.map(v => v.name))),
      catchError(err => {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting tags: ${err.error?.message || err.message}`
        });
        throw err;
      })
    )
  }

  override update(data: Tagged): Observable<Tagged> {
    return this.restDataSource.putResponseData<Tagged>(
      `${this._taggedResourceName}/${this.resourceName}`, data);
  }
}
