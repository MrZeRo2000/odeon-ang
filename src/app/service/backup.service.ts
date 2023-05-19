import { Injectable } from '@angular/core';
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {Observable, tap} from "rxjs";
import {DatabaseBackupInfo} from "../model/database-backup-info";
import {SharedHandler} from "../utils/rxjs-utils";
import {Message} from "../model/message";

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  databaseBackupInfoSharedHandler = new SharedHandler<DatabaseBackupInfo>(
    () => this.getBackupInfo()
  );

  constructor(private restDataSource: RestDataSourceService) { }

  getBackupInfo(): Observable<DatabaseBackupInfo> {
    return this.restDataSource.getResponseData<DatabaseBackupInfo>("backup")
  }

  createBackup(): Observable<Message> {
    return this.restDataSource.postResponseData<Message>("backup", null).pipe(
      tap(() => this.databaseBackupInfoSharedHandler.refreshTable())
    );
  }
}
