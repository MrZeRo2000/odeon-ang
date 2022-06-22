import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-compositions-table',
  templateUrl: './compositions-table.component.html',
  styleUrls: ['./compositions-table.component.scss']
})
export class CompositionsTableComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const artifactId = this.route.snapshot.paramMap.get('id');
    console.log(`Routed with id=${artifactId}`)
  }

}
