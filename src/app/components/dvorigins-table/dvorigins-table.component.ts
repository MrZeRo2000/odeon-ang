import {Component, OnInit} from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {DVOrigin} from "../../model/dv-product";
import {Observable, of} from "rxjs";
import {CRUDResult} from "../../model/crud";
import {ConfirmationService, MessageService} from "primeng/api";
import {DVOriginService} from "../../service/dvorigin.service";

@Component({
  selector: 'app-dvorigins-table',
  templateUrl: './dvorigins-table.component.html',
  styleUrls: ['./dvorigins-table.component.scss']
})
export class DVOriginsTableComponent extends BaseTableComponent<DVOrigin, DVOrigin> implements OnInit {

  table$?: Observable<Array<DVOrigin>>;

  constructor(
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private dvOriginService: DVOriginService) {
    super(messageService, confirmationService, dvOriginService, {
      deleteConfirmation: "`Are you sure that you want to delete <strong> ${event.data.name}</strong>?`",
      deleteErrorMessage: "`Error deleting origin: ${v.data}`",
      editErrorMessage: "Error getting origin details"
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  protected getEditData(item: DVOrigin): Observable<CRUDResult<DVOrigin>> {
    return of({success: true, data: item});
  }

  protected loadData(): void {
    this.table$ = this.dvOriginService.table$;
    this.dvOriginService.tableSharedHandler.refreshTable()
  }
}
