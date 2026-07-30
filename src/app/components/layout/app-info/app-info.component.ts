import {Component, OnInit} from '@angular/core';
import packageJson from '../../../../../package.json';
import {AppInfoService} from "../app-info.service";
import {catchError, of, share, switchMap, tap} from "rxjs";
import {MessageService} from "primeng/api";
import {compareVersions, ComparisonResult} from "../../../utils/version-comparator";

@Component({
    selector: 'app-app-info',
    templateUrl: './app-info.component.html',
    styleUrls: ['./app-info.component.css'],
    standalone: false
})
export class AppInfoComponent implements OnInit {
  version: string = packageJson.version;
  backendVersion: string = packageJson.backend_version;

  comparisonResult?: ComparisonResult;

  appInfo$ = this.appService.appInfo$.pipe(
    switchMap(value => {return of(value)}),
    tap(v => {
      console.log(`Discovered backend version: ${v.version}`)
      this.comparisonResult = compareVersions(v.version, this.backendVersion);
      if (this.comparisonResult === ComparisonResult.CR_MAJOR_DIFFERENCE) {
        this.messageService.add({severity:'error', summary:'Error', detail:`Backend version: ${v.version} is not compatible with required version: ${this.backendVersion}`});
      }
    }),
    share({resetOnComplete: true, resetOnError: true, resetOnRefCountZero: true}),
    catchError(() => {
      this.messageService.add({severity:'error', summary:'Error', detail:`Error getting version information`});
      return of(undefined);
    })
  );

  constructor(private appService: AppInfoService, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  onClick() {

  }

  protected readonly ComparisonResult = ComparisonResult;
}
