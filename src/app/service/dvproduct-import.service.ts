import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {DVProductUserImport, ImportStats} from "../model/dv-product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DVProductImportService {

  constructor(private restDataSource: RestDataSourceService) { }

  analyze(data: DVProductUserImport): Observable<ImportStats> {
    return this.restDataSource.postResponseData<ImportStats>("/analyze", data);
  }

  execute(data: DVProductUserImport): Observable<ImportStats> {
    return this.restDataSource.postResponseData<ImportStats>("/execute", data);
  }

}
