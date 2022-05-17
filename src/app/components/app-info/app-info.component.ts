import { Component, OnInit } from '@angular/core';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent implements OnInit {
  version: string = packageJson.version;

  constructor() { }

  ngOnInit(): void {
  }

}
