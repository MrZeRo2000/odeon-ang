import {AfterViewInit, Component} from '@angular/core';
import {PreLoaderService} from "./service/pre-loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Odeon';

  constructor(private preLoader: PreLoaderService) {}

  ngAfterViewInit(): void {
    this.preLoader.hide();
  }
}
