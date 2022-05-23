import { Injectable } from '@angular/core';
import {ProcessorRequest} from "../model/processor-request";
import {catchError, interval, Observable, switchMap, takeWhile, tap, throwError} from "rxjs";
import {Message} from "../model/message";
import {RestDataSourceService} from "../data-source/rest-data-source.service";
import {ProcessInfo} from "../model/process-info";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  processInfo$ = this.getProcessInfo();

  constructor(private restDataSource: RestDataSourceService) { }

  startProcess(processorRequest: ProcessorRequest): Observable<Message> {
    return this.restDataSource.postResponseData<Message>("process", processorRequest)
  }

  getProcessInfo(): Observable<ProcessInfo> {
    return interval(5000).pipe(
      switchMap(() => {
        return this.restDataSource.getResponseData<ProcessInfo>("process1");
      }),
      catchError(err => {
        console.error(`Found error in ProcessInfo: ${err.message}`)
        return throwError(err);
      }),
      tap(() => {console.log("getProcessInfo cycle")}),
      takeWhile(pi => pi.processingStatus !== 'SUCCESS')
    )
  }
}
