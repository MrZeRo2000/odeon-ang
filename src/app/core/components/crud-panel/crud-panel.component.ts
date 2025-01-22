import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CRUDAction, CRUDOperation} from "../../../model/crud";

@Component({
    selector: 'app-crud-panel',
    templateUrl: './crud-panel.component.html',
    styleUrls: ['./crud-panel.component.scss'],
    standalone: false
})
export class CrudPanelComponent implements OnInit {
  CRUDAction = CRUDAction;

  @Input()
  data: any;

  @Input()
  crudActions: Array<CRUDAction> = [];

  @Output()
  crudEvent: EventEmitter<CRUDOperation<any>> = new EventEmitter<CRUDOperation<any>>()

  constructor() { }

  ngOnInit(): void {
  }

}
