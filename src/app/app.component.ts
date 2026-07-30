import {AfterViewInit, Component, ChangeDetectionStrategy} from '@angular/core';
import {PreLoaderService} from "./service/pre-loader.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent implements AfterViewInit {
  title = 'Odeon';

  constructor(private preLoader: PreLoaderService) {}

  ngAfterViewInit(): void {
    this.preLoader.hide();
  }
}
