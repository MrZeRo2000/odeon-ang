import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {DVCategory} from "../../model/dv-product";
import {Observable, of, tap} from "rxjs";
import {CRUDResult} from "../../model/crud";
import {ConfirmationService, MessageService} from "primeng/api";
import {DVCategoryService} from "../../service/dvcategory.service";

@Component({
  selector: 'app-dvcategory-table',
  templateUrl: './dvcategories-table.component.html',
  styleUrls: ['./dvcategories-table.component.scss']
})
export class DVCategoriesTableComponent extends BaseTableComponent<DVCategory, DVCategory> implements OnInit {

  @ViewChild('dtc', { static: false})
  private tableContainerElement?: ElementRef;

  @ViewChild('caption', { static: false})
  private tableCaptionElement?: ElementRef;

  scrollHeight = "0px";

  table$?: Observable<Array<DVCategory>>;

  constructor(
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private dvCategoryService: DVCategoryService) {
    super(messageService, confirmationService, dvCategoryService, {
      deleteConfirmation: "`Are you sure that you want to delete <strong> ${event.data.name}</strong>?`",
      deleteErrorMessage: "`Error deleting category: ${v.data}`",
      editErrorMessage: "Error getting category details"
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  protected getEditData(item: DVCategory): Observable<CRUDResult<DVCategory>> {
    return of({success: true, data: item});
  }

  protected loadData(): void {
    this.table$ = this.dvCategoryService.table$.pipe(
      tap(() => {setTimeout(() => this.updateScrollHeight(), 0);})
    );
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
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScrollHeight();
  }
}
