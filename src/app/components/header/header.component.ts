import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: "Artists",
        routerLink: ['/artists']
      },
      {
        label: "Music",
        command: (event?: any) => {alert("Click");}
      },
      {
        label: "Processing",
        icon: PrimeIcons.DATABASE,
        routerLink: ['/processing']
      }
      ];
  }

}
