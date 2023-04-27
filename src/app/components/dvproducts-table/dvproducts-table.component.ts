import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {DVCategory, DVOrigin, DVProduct} from "../../model/dv-product";
import {CRUDResult} from "../../model/crud";
import {catchError, concatMap, forkJoin, from, iif, map, Observable, of, startWith, switchMap, take, tap} from "rxjs";
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

  dvOriginNames: Array<string> = [];

  @ViewChild('dtc', { static: false})
  private tableContainerElement?: ElementRef;

  @ViewChild('caption', { static: false})
  private tableCaptionElement?: ElementRef;

  scrollHeight = "0px";
  virtualScroll = false;

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
      editErrorMessage: "`Error getting product details`"
    });
  }

  filteredTable$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    switchMap(v => {
      return from([0, v.artifactTypeId]).pipe(
        concatMap(v => {
          if (v) {
            return this.dvProductService.getTable(v as number)
          } else {
            return of(null)
          }
        })
      )
    }),
    tap(v => {
      //const a = [... new Set(v?.map(v => v.dvOrigin))]
      this.dvOriginNames = [... new Set(v?.map(v => v.dvOrigin.name))].sort()
      console.log(`In tap dvOriginNames: ${JSON.stringify(this.dvOriginNames)}`)
    }),
    tap(() => {setTimeout(() => this.updateScrollHeight(), 0);}),
  )

  getFrontInfos(table: Array<DVProduct>): Array<string> {
    return [... new Set(table
      .map(v => v.frontInfo as string)
      .filter(v => !!v)
    )].sort();
  }

  protected getEditData(item: DVProduct): Observable<CRUDResult<[DVProduct, Array<DVOrigin>, Array<DVCategory>]>> {
    return forkJoin([
      iif(
        () => Object.keys(item).length === 0,
        of({artifactTypeId: this.filterForm.value.artifactTypeId as number} as DVProduct),
        this.dvProductService.get(item.id as number)
        ),
      this.dvOriginService.table$.pipe(take(1)),
      this.dvCategoryService.table$.pipe(take(1))
    ]).pipe(
      map(v => {
        return {success: true, data: v as [DVProduct, Array<DVOrigin>, Array<DVCategory>]}
      }),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  protected loadData(): void {
    console.log(`Load data filter value: ${JSON.stringify(this.filterForm.value)}`)
    this.dvProductService.refreshTable();
    this.filterForm.setValue({artifactTypeId: this.filterForm.value.artifactTypeId as number});
  }

  private updateScrollHeight(): void {
    const windowHeight = window.innerHeight;
    const tableContainerTop = this.tableContainerElement?.nativeElement.offsetTop;
    const tableCaptionOffset = this.tableCaptionElement?.nativeElement.parentElement.offsetHeight;
    const containerHeight = windowHeight
      - tableContainerTop
      - tableCaptionOffset
      - parseFloat(getComputedStyle(document.documentElement).fontSize) / 2;
    this.scrollHeight = `${containerHeight}px`
    this.virtualScroll = true
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScrollHeight();
  }

}
