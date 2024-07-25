import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BaseCrudTableComponent} from "../../base/base-crud-table.component";
import {DVCategory, DVOrigin, DVProduct} from "../../../model/dv-product";
import {CRUDResult} from "../../../model/crud";
import {
  catchError,
  concatMap,
  forkJoin,
  from,
  iif,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  take,
  tap
} from "rxjs";
import {ConfirmationService, FilterService, MessageService, SelectItem} from "primeng/api";
import {DVProductService} from "../../../service/dvproduct.service";
import {DVOriginService} from "../../../service/dvorigin.service";
import {DVCategoryService} from "../../../service/dvcategory.service";
import {ARTIFACT_EDIT_CONFIG, CodeName} from "../../../model/artifacts";
import {FormBuilder, Validators} from "@angular/forms";
import {IdTitleOriginalTitle, TextInterface} from "../../../model/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dvproducts-table',
  templateUrl: './dvproducts-table.component.html',
  styleUrls: ['./dvproducts-table.component.scss']
})
export class DVProductsTableComponent
  extends BaseCrudTableComponent<DVProduct, [DVProduct, Array<DVOrigin>, Array<DVCategory>, Array<IdTitleOriginalTitle>]>
  implements OnInit {
  private static readonly SESSION_KEY = "dvproducts-table-filter-form";

  readonly ARTIFACT_TYPES = ARTIFACT_EDIT_CONFIG
    .filter(v => v.hasProduct)
    .map(v =>  v as CodeName);

  filterForm = this.fb.group(
    (
      () => {
        try {
          const savedState = sessionStorage.getItem(DVProductsTableComponent.SESSION_KEY);
          const savedObject = JSON.parse(savedState as string);
          return {
            artifactTypeId: [savedObject.artifactTypeId, Validators.required]
          }
        } catch (e)  {
          return {
            artifactTypeId: [this.ARTIFACT_TYPES[0].code, Validators.required]
          }
        }
      }
    )());

  dvOriginNames: Array<SelectItem<string>> = [];
  dvCategoryNames: Array<SelectItem<string>> = [];

  @ViewChild('dtc', { static: false})
  private tableContainerElement?: ElementRef;

  @ViewChild('caption', { static: false})
  private tableCaptionElement?: ElementRef;

  scrollHeight = window.innerHeight;

  displayDescription = false;

  private showDescriptionAction: Subject<number> = new Subject();

  showDescription$ = this.showDescriptionAction.pipe(
    switchMap(v => {
      return this.dvProductService.getDescription(v).pipe(
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting description by id ${v}`
          })
          return of({} as TextInterface);
        }),
        tap(v => {
          this.displayDescription = !!v?.text
        })
      )
    })
  );

  displayNotes = false;

  private showNotesAction: Subject<number> = new Subject();

  showNotes$ = this.showNotesAction.pipe(
    switchMap(v => {
      return this.dvProductService.getNotes(v).pipe(
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting notes by id ${v}`
          })
          return of({} as TextInterface);
        }),
        tap(v => {
          this.displayNotes = !!v?.text
        })
      )
    })
  );

  displayImportProducts = false;

  private importProductsSubject: Subject<void> = new Subject();

  importProducts$ = this.importProductsSubject.asObservable().pipe(
    switchMap(() =>
      forkJoin([
        of(this.filterForm.value.artifactTypeId as number),
        this.dvOriginService.table$.pipe(take(1)),
        this.dvCategoryService.table$.pipe(take(1))
      ])
    ),
    tap(() => {
      this.displayImportProducts = true;
    })
  )

  constructor (
    private router: Router,
    private fb: FormBuilder,
    private filterService: FilterService,
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private dvProductService: DVProductService,
    private dvOriginService: DVOriginService,
    private dvCategoryService: DVCategoryService) {
    super(messageService, confirmationService, dvProductService, {
      deleteConfirmation: event => `Are you sure that you want to delete <strong> ${event.data.title}</strong>?`,
      deleteErrorMessage: v => `Error deleting product: ${v.data}`,
      editErrorMessage: () => `Error getting product details`
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

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  filteredTable$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    tap(v => {
      console.log(`Writing to ${DVProductsTableComponent.SESSION_KEY}: ${JSON.stringify(v)}`);
      sessionStorage.setItem(DVProductsTableComponent.SESSION_KEY, JSON.stringify(v));
    }),
    switchMap(v => {
      return from([0, v.artifactTypeId]).pipe(
        concatMap(v => {
          if (v) {
            return this.dvProductService.getTable(v as number).pipe(
              tap(() => {setTimeout(() => this.updateScrollHeight(), 0);}),
            )
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
  )

  getFrontInfos(table: Array<DVProduct>): Array<string> {
    return [... new Set(table
      .map(v => v.frontInfo as string)
      .filter(v => !!v)
    )].sort();
  }

  protected getEditData(item: DVProduct): Observable<CRUDResult<[DVProduct, Array<DVOrigin>, Array<DVCategory>, Array<IdTitleOriginalTitle>]>> {
    return forkJoin([
      iif(
        () => Object.keys(item).length === 0,
        of({artifactTypeId: this.filterForm.value.artifactTypeId as number} as DVProduct),
        this.dvProductService.get(item.id as number)
        ),
      this.dvOriginService.table$.pipe(take(1)),
      this.dvCategoryService.table$.pipe(take(1)),
      this.dvProductService.getIdTitleOriginalTitleTable(this.filterForm.value.artifactTypeId as number).pipe(take(1)),
    ]).pipe(
      map(v => {
        return {success: true, data: v as [DVProduct, Array<DVOrigin>, Array<DVCategory>, Array<IdTitleOriginalTitle>]}
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

  onImport(): void {
    this.displayImportProducts = false;
    this.loadData();
  }

  private updateScrollHeight(): void {
    const windowHeight = window.innerHeight;
    const tableContainerTop = this.tableContainerElement?.nativeElement.offsetTop;
    const tableCaptionOffset = this.tableCaptionElement?.nativeElement.parentElement.offsetHeight;
    const containerHeight = windowHeight
      - tableContainerTop
      - tableCaptionOffset
      - parseFloat(getComputedStyle(document.documentElement).fontSize) / 2;
    if (containerHeight > 0) {
      this.scrollHeight = containerHeight
      console.log(`Scroll height updated to ${this.scrollHeight}`)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScrollHeight();
  }

  showDescription(event: any, item: DVProduct): void {
    event.preventDefault();
    console.log(`Display description for ${JSON.stringify(item)}`);
    if (item.id != null) {
      this.showDescriptionAction.next(item.id);
    }
  }

  showNotes(event: any, item: DVProduct): void {
    event.preventDefault();
    console.log(`Display notes for ${JSON.stringify(item)}`);
    if (item.id != null) {
      this.showNotesAction.next(item.id);
    }
  }

  showTracks(event: any, item: DVProduct): void {
    event.preventDefault();
    console.log(`Display tracks for ${JSON.stringify(item)}`);
    if (item.id != null) {
      this.router.navigate(['/tracks'], {queryParams: {dvProductId: item.id}}).then();
      //this.showNotesAction.next(item.id);
    }
  }

  showImportDVProducts(event: any): void {
    event.preventDefault();
    this.importProductsSubject.next();
  }
}
