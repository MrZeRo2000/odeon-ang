import { Component, OnInit } from '@angular/core';
import packageJson from '../../../../package.json';
import {AppService} from "../../service/app.service";
import {catchError, Observable, of, share, switchMap} from "rxjs";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent implements OnInit {
  version: string = packageJson.version;

  appInfo$ = this.appService.appInfo$.pipe(
    switchMap(value => {return of(value)}),
    share({resetOnComplete: true, resetOnError: true, resetOnRefCountZero: true}),
    catchError(e => {
      this.messageService.add({severity:'error', summary:'Error', detail:`Error getting version information`});
      return of(undefined);
    })
  );

  constructor(private appService: AppService, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  onClick() {

  }

}
