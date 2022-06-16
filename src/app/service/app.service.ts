import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable, share, shareReplay} from "rxjs";
import {AppInfo} from "../model/app-info";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  appInfo$ = this.getAppInfo();

  constructor(private restDataSource: RestDataSourceService) { }

  getAppInfo(): Observable<AppInfo> {
    if (!this.appInfo$) {
      return this.restDataSource.getResponseData<AppInfo>("app/info").pipe(
        share({resetOnComplete: true, resetOnError: true, resetOnRefCountZero: true})
      );
    } else {
      return this.appInfo$;
    }
  }

}
