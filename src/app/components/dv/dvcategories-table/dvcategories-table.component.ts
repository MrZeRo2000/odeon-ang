import { Component, OnInit } from '@angular/core';
import {BaseCrudTableComponent} from "../../base/base-crud-table.component";
import {DVCategory} from "../../../model/dv-product";
import {Observable, of} from "rxjs";
import {CRUDResult} from "../../../model/crud";
import {ConfirmationService, MessageService} from "primeng/api";
import {DVCategoryService} from "../../../service/dvcategory.service";

@Component({
    selector: 'app-dvcategory-table',
    templateUrl: './dvcategories-table.component.html',
    styleUrls: ['./dvcategories-table.component.css'],
    standalone: false
})
export class DVCategoriesTableComponent extends BaseCrudTableComponent<DVCategory, DVCategory> implements OnInit {

  table$?: Observable<Array<DVCategory>>;

  constructor(
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private dvCategoryService: DVCategoryService) {
    super(messageService, confirmationService, dvCategoryService, {
      deleteConfirmation: event => `Are you sure that you want to delete <strong> ${event.data.name}</strong>?`,
      deleteErrorMessage: v => `Error deleting category: ${v.data}`,
      editErrorMessage: () => "Error getting category details"
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  protected getEditData(item: DVCategory): Observable<CRUDResult<DVCategory>> {
    return of({success: true, data: item});
  }

  protected loadData(): void {
    this.table$ = this.dvCategoryService.table$;
    this.dvCategoryService.tableSharedHandler.refreshTable();
  }
}
