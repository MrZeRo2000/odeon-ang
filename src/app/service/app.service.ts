import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable} from "rxjs";
import {AppInfo} from "../model/app-info";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  appInfo$ = this.getAppInfo();

  constructor(private restDataSource: RestDataSourceService) { }

  getAppInfo(): Observable<AppInfo> {
    return this.restDataSource.getResponseData<AppInfo>("app/info");
  }

}
