import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../../data-source/rest-data-source.service";
import {delay, Observable, share} from "rxjs";
import {AppInfo} from "../../model/app-info";

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  appInfo$ = this.getAppInfo();

  constructor(private restDataSource: RestDataSourceService) { }

  getAppInfo(): Observable<AppInfo> {
    if (!this.appInfo$) {
      return this.restDataSource.getResponseData<AppInfo>("app/info").pipe(
        // use 3000 to test preloader
        delay(0),
        share({resetOnComplete: false, resetOnError: true, resetOnRefCountZero: true})
      );
    } else {
      return this.appInfo$;
    }
  }

}
