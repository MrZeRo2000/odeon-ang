import { Component, signal } from '@angular/core';
import {BackupService} from "../backup.service";
import {catchError, EMPTY, finalize, Observable, of, Subject, switchMap, tap} from "rxjs";
import {Message} from "../../../model/message";
import {MessageService} from "primeng/api";
import {DatabaseBackupInfo} from "../../../model/database-backup-info";
import {DateFormatter} from "../../../utils/date-utils";
import {ProcessService} from "../../../service/process.service";

@Component({
    selector: 'app-database-backup',
    templateUrl: './database-backup.component.html',
    styleUrls: ['./database-backup.component.css'],
    standalone: false
})
export class DatabaseBackupComponent {

  databaseBackupInfoSharedHandler = this.backupService.databaseBackupInfoSharedHandler;

  databaseBackupInfo$ = this.databaseBackupInfoSharedHandler.getSharedObservable();

  backupSubject = new Subject<void>();

  displayProgress = signal(false)

  backupAction$ = this.backupSubject.asObservable().pipe(
    switchMap(() =>
      this.processService.getProcessStatusCompleted().pipe(
        switchMap(completed => {
          if (!completed) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'A process is already running'
            });
            return EMPTY;
          }
          return of(true);
        })
      )
    ),
    switchMap(() => {
      this.displayProgress.set(true);
      
      return this.backup().pipe(
        finalize(() => this.displayProgress.set(false))
      )      
    }),
    tap(v => {      
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
    }),    
  );
  constructor(
    private messageService: MessageService,
    private processService: ProcessService,
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
