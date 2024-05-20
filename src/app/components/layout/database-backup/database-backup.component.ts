import { Component } from '@angular/core';
import {BackupService} from "../backup.service";
import {catchError, Observable, of, Subject, switchMap, tap} from "rxjs";
import {Message} from "../../../model/message";
import {MessageService} from "primeng/api";
import {DatabaseBackupInfo} from "../../../model/database-backup-info";
import {DateFormatter} from "../../../utils/date-utils";

@Component({
  selector: 'app-database-backup',
  templateUrl: './database-backup.component.html',
  styleUrls: ['./database-backup.component.scss']
})
export class DatabaseBackupComponent {

  databaseBackupInfoSharedHandler = this.backupService.databaseBackupInfoSharedHandler;

  databaseBackupInfo$ = this.databaseBackupInfoSharedHandler.getSharedObservable();

  backupSubject = new Subject<void>();

  displayProgress = false

  backupAction$ = this.backupSubject.asObservable().pipe(
    tap(() => {this.displayProgress = true}),
    switchMap(() => this.backup()),
    tap(v => {
      this.displayProgress = false
      if (v.message) {
        this.databaseBackupInfoSharedHandler.refreshTable();
        this.messageService.add({
          severity: 'success',
          summary: 'Info',
          detail: 'Backup created successfully'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error creating backup'
        });
      }
    })
  );

  constructor(
    private messageService: MessageService,
    private backupService: BackupService) {
  }

  private backup(): Observable<Message> {
    return this.backupService.createBackup().pipe(
      catchError(() => {return of({} as Message)})
    )
  }

  getBackupTooltipText(info: DatabaseBackupInfo): string {
    if (info.lastBackupDateTime) {
      return `Last backup: ${DateFormatter.formatDateTime(info.lastBackupDateTime)}`

    } else {
      return 'No backup available'
    }
  }
}
