import { Component } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {DVCategory, DVOrigin, DVProduct} from "../../model/dv-product";
import {CRUDResult} from "../../model/crud";
import {catchError, concatMap, forkJoin, map, Observable, of, startWith, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {DVProductService} from "../../service/dvproduct.service";
import {DVOriginService} from "../../service/dvorigin.service";
import {DVCategoryService} from "../../service/dvcategory.service";
import {ARTIFACT_EDIT_CONFIG, CodeName} from "../../model/artifacts";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-dvproducts-table',
  templateUrl: './dvproducts-table.component.html',
  styleUrls: ['./dvproducts-table.component.scss']
})
export class DVProductsTableComponent extends BaseTableComponent<DVProduct, [DVProduct, Array<DVOrigin>, Array<DVCategory>]>{

  readonly ARTIFACT_TYPES = ARTIFACT_EDIT_CONFIG
    .filter(v => v.hasProduct)
    .map(v =>  v as CodeName);

  filterForm = this.fb.group({
    artifactTypeId: [this.ARTIFACT_TYPES[0].code, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private dvProductService: DVProductService,
    private dvOriginService: DVOriginService,
    private dvCategoryService: DVCategoryService) {
    super(messageService, confirmationService, dvProductService, {
      deleteConfirmation: "`Are you sure that you want to delete <strong> ${event.data.title}</strong>?`",
      deleteErrorMessage: "`Error deleting product: ${v.data}`",
      editErrorMessage: "Error getting product details"
    });
  }

  filteredTable$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    //tap(v => {console.log(`filteredTable: ${JSON.stringify(v)}`)}),
    switchMap(v => {
      return of(null, v).pipe(
        //tap(v => {console.log(`inner: ${JSON.stringify(v)}`)}),
        concatMap(v => {
          if (v) {
            return this.dvProductService.getTable(v.artifactTypeId as number)
          } else {
            return of(null)
          }
        })
      )
    }),
    //tap(v => {console.log(`Returned table: ${JSON.stringify(v).substring(0, 20)}`)})
  )

  protected getEditData(item: DVProduct): Observable<CRUDResult<[DVProduct, Array<DVOrigin>, Array<DVCategory>]>> {
    return forkJoin([
      this.dataService.get(this.filterForm.value.artifactTypeId as number),
      this.dvOriginService.table$,
      this.dvCategoryService.table$
    ]).pipe(
      map(v => {return {success: true, data: v as [DVProduct, Array<DVOrigin>, Array<DVCategory>]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  protected loadData(): void {
    console.log(`Load data filter value: ${JSON.stringify(this.filterForm.value)}`)
    this.filterForm.setValue({artifactTypeId: this.filterForm.value.artifactTypeId as number});
  }

}
