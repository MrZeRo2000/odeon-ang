import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Tagged} from "../model/tag";
import {Observable} from "rxjs";
import {IdName} from "../model/common";

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

  override update(data: Tagged): Observable<Tagged> {
    return this.restDataSource.putResponseData<Tagged>(
      `${this._taggedResourceName}/${this.resourceName}`, data);
  }
}
