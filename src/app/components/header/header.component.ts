import { Component, OnInit } from '@angular/core';
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
        label: "Lyrics",
        routerLink: ['/lyrics']
      },
      {
        label: "Music",
        routerLink: ['/artifacts']
      },
      {
        label: "Video",
        routerLink: ['/artifacts-video']
      },
      {
        label: "Products",
        items: [
          {
            label: "Origins",
            routerLink: ['/dvorigins']
          },
          {
            label: "Categories",
            routerLink: ['/dvcategories']
          }
        ]
      },
      {
        label: "Processing",
        icon: PrimeIcons.DATABASE,
        routerLink: ['/processing']
      }
      ];
  }
}
