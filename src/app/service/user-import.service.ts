import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {DVProductUserImport, ImportStats} from "../model/user-import";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserImportService {

  constructor(private restDataSource: RestDataSourceService) { }

  dvProductAnalyze(data: DVProductUserImport): Observable<ImportStats> {
    return this.restDataSource.postResponseData<ImportStats>("user-import/dvproduct/analyze", data);
  }

  dvProductExecute(data: DVProductUserImport): Observable<ImportStats> {
    return this.restDataSource.postResponseData<ImportStats>("user-import/dvproduct/execute", data);
  }

}
