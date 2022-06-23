import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CompositionEditItem, CompositionTableItem} from "../model/composition";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {CRUDService} from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class CompositionService extends CRUDService<CompositionEditItem>{

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "composition")
  }

  getTable(artifactId: number): Observable<Array<CompositionTableItem>> {
    return this.restDataSource.getResponseData<Array<CompositionTableItem>>(`composition/table/${artifactId}`)
  }
}
