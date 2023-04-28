import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {DVCategory, DVOrigin, DVProduct} from "../../model/dv-product";
import {CRUDResult} from "../../model/crud";
import {catchError, concatMap, forkJoin, from, iif, map, Observable, of, startWith, switchMap, take, tap} from "rxjs";
import {ConfirmationService, FilterService, MessageService, SelectItem} from "primeng/api";
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
export class DVProductsTableComponent
  extends BaseTableComponent<DVProduct, [DVProduct, Array<DVOrigin>, Array<DVCategory>]>
  implements OnInit {

  readonly ARTIFACT_TYPES = ARTIFACT_EDIT_CONFIG
    .filter(v => v.hasProduct)
    .map(v =>  v as CodeName);

  filterForm = this.fb.group({
    artifactTypeId: [this.ARTIFACT_TYPES[0].code, Validators.required]
  });

  dvOriginNames: Array<SelectItem<string>> = [];
  dvCategoryNames: Array<SelectItem<string>> = [];

  @ViewChild('dtc', { static: false})
  private tableContainerElement?: ElementRef;

  @ViewChild('caption', { static: false})
  private tableCaptionElement?: ElementRef;

  scrollHeight = "0px";
  virtualScroll = false;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
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

  ngOnInit(): void {
    this.filterService.register(
      'filter_categories',
      (value: any, filter: any): boolean => {
        if (filter === undefined || filter === null || filter.length === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return (value as any[]).filter(v => filter.indexOf(v.name) !== -1).length == filter.length;
      }
    );
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
      this.dvOriginNames = [... new Set(v?.map(v => v.dvOrigin.name))].sort().map(v => {return {label: v, value: v} as SelectItem});
      this.dvCategoryNames = [... new Set(v?.map(v => v.dvCategories.map(v => v.name)).flat())].sort().map(v => {return {label: v, value: v} as SelectItem});
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
