import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  DVCategory,
  DVOrigin
} from "../../../model/dv-product";
import {
  DVProductUserImport,
  DVProductUserImportDetail,
  ImportStats
} from "../../../model/user-import";
import {filterString} from "../../../utils/search-utils";
import {catchError, iif, Observable, of, Subject, switchMap, tap} from "rxjs";
import {UserImportService} from "../../../service/user-import.service";
import {MessageService} from "primeng/api";

enum ImportAction {
  ACTION_ANALYZE,
  ACTION_EXECUTE
}

@Component({
    selector: 'app-dvproducts-import-form',
    templateUrl: './dvproducts-import-form.component.html',
    styleUrls: ['./dvproducts-import-form.component.scss'],
    standalone: false
})
export class DVProductsImportFormComponent extends BaseFormComponent implements OnInit {
  ImportAction = ImportAction

  @Input()
  artifactTypeId: number = 0;

  @Input()
  dvOrigins: Array<DVOrigin> = [];

  @Input()
  dvCategories: Array<DVCategory> = [];

  @Input()
  frontInfos: Array<string> = [];

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  editForm: FormGroup = this.fb.group({
    dvOrigin: ['', Validators.required],
    frontInfo: [''],
    dvCategories: [[]],
    titles: ['', Validators.required],
    originalTitles: [''],
    years: [''],
  });

  filteredFrontInfos: Array<string> = [];

  displayImportResult = false;

  private actionSubject: Subject<{action: ImportAction, data: DVProductUserImport}> = new Subject();

  action$: Observable<ImportStats | undefined> = this.actionSubject.asObservable().pipe(
    switchMap(v =>
      iif(
        () => v.action === ImportAction.ACTION_EXECUTE,
        this.userImportService.dvProductExecute(v.data).pipe(
          tap(() => this.onImport.next()),
          catchError(() => {
            this.messageService.add({severity:'error', summary:'Error', detail:`Error executing import`});
            return of(undefined);
          })),
        this.userImportService.dvProductAnalyze(v.data).pipe(
          catchError(() => {
            this.messageService.add({severity:'error', summary:'Error', detail:`Error executing analysis`});
            return of(undefined);
          }))
        )
    ),
    tap(v => this.displayImportResult = !!v)
  )

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userImportService: UserImportService, ) {
    super();
  }

  ngOnInit(): void {
    this.editForm.patchValue({
      dvOrigin: this.dvOrigins[0]
      }
    )
  }

  private getFormData(): DVProductUserImport {
    const titles = this.editForm.value.titles.split('\n').filter((v: any) => !!v);
    const originalTitles = this.editForm.value.originalTitles.split('\n').filter((v: any) => !!v);
    const years = this.editForm.value.years.split('\n').filter((v: any) => !isNaN(Number.parseInt(v, 10)));


    if (titles.length === 0) {
      throw Error("Titles are empty")
    }

    if ((originalTitles.length > 0) && (originalTitles.length !== titles.length)) {
      throw Error("Original titles do not match titles")
    }

    if ((years.length > 0) && (years.length !== titles.length)) {
      throw Error("Years do not match titles")
    }

    const dvProductDetails: DVProductUserImportDetail[] = titles.map(
      (v: string, n: number) => {
        return {
          title: v,
          originalTitle: originalTitles[n] || null,
          year: Number.parseInt(years[n], 10)
        } as DVProductUserImportDetail
      }
    )

    return {
      artifactTypeId: this.artifactTypeId,
      dvOriginId: this.editForm.value.dvOrigin.id,
      dvCategories: this.editForm.value.dvCategories,
      frontInfo: this.editForm.value.frontInfo,
      dvProductDetails: dvProductDetails
    } as DVProductUserImport
  }

  searchFrontInfos(event: any): void {
    this.filteredFrontInfos = filterString(this.frontInfos, event.query);
  }

  performAction(action: ImportAction): void {
    try {
      this.actionSubject.next({action, data: this.getFormData()})
    } catch (e: any) {
      this.messageService.add({severity:'error', summary:'Error', detail:`Error validating form data: ${e.message}`})
    }

    console.log(`Performing action ${action}, form data: ${JSON.stringify(this.getFormData())}`)
  }
}
