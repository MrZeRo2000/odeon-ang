import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../../data-source/rest-data-source.service";
import {delay, Observable, shareReplay, tap} from "rxjs";
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
        tap(() => console.log(`Loaded appInfo`)),
        delay(0),
        shareReplay(1)
      );
    } else {
      return this.appInfo$;
    }
  }
}
