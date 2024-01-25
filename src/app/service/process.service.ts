import { Injectable } from '@angular/core';
import {ProcessorRequest} from "../model/processor-request";
import {
  BehaviorSubject,
  catchError, iif,
  map,
  Observable,
  of, shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throwError,
  timer
} from "rxjs";
import {Message} from "../model/message";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {ProcessInfo, ProcessingAction, ProcessingStatus} from "../model/process-info";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  processInfo$ = this.getProcessInfo();

  private processingStatus$ = new Subject<void>();

  private refreshTable$ = new BehaviorSubject<boolean>(false);

  public refreshTable(): void {
    this.refreshTable$.next(true);
  }

  private table$: Observable<Array<ProcessInfo>> = this.getTable();

  constructor(private restDataSource: RestDataSourceService) { }

  initProcessingStatus(): void {
    this.processingStatus$ = new Subject<void>();
  }

  startProcess(processorRequest: ProcessorRequest): Observable<Message> {
    return this.restDataSource.postResponseData<Message>("process", processorRequest)
  }

  resolveAction(processingAction: ProcessingAction): Observable<ProcessInfo> {
    return this.restDataSource.postResponseData<ProcessInfo>("process/resolve", processingAction);
  }

  getProcessInfo(): Observable<ProcessInfo> {
    this.initProcessingStatus();

    return timer(0, 1000).pipe(
      tap(() => console.log("Before takeUntil")),
      takeUntil(this.processingStatus$),
      tap(() => console.log("Getting info")),
      switchMap(() => {
        return this.restDataSource.getResponse<ProcessInfo>("process").pipe(
          map(response => response.body || {processingStatus: undefined}
          )
        )
      }),
      catchError(err => {
        if (err.status === 404) {
          console.error(`Got 404`);
          return of({processingStatus: undefined});
        } else {
          console.error(`Found error in ProcessInfo: ${err.message}`)
          return throwError(err);
        }
      }),
      tap((pi) => {
        console.log(`getProcessInfo cycle ${JSON.stringify(pi)}`);
        if (pi.processingStatus === undefined || pi.processingStatus !== ProcessingStatus[ProcessingStatus.IN_PROGRESS]) {
          this.processingStatus$.next();
          this.processingStatus$.complete();
          this.refreshTable$.next(false);
          console.log(`ProcessingStatus completed`)
        }
      })
    )
  }

  getTable(): Observable<Array<ProcessInfo>> {
    if (!this.table$)
    {
      this.table$ = this.refreshTable$.pipe(
        tap(v => {console.log(`Refreshing process table with ${v}`)}),
        switchMap(v =>
          iif(
            () => v,
            this.restDataSource.getResponseData<Array<ProcessInfo>>("process/table"),
            of([]))),
        shareReplay(1),
      )
    }

    return this.table$;
  }
}
