import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {DVCategory, DVOrigin, DVProduct} from "../../../model/dv-product";
import {MessageService} from "primeng/api";
import {DVProductService} from "../../../service/dvproduct.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {filterString} from "../../../utils/search-utils";
import {IdTitleOriginalTitle} from "../../../model/common";

@Component({
    selector: 'app-dvproduct-form',
    templateUrl: './dvproduct-form.component.html',
    styleUrls: ['./dvproduct-form.component.scss'],
    standalone: false
})
export class DVProductFormComponent extends BaseCrudFormComponent<DVProduct> implements OnInit {
  @ViewChild('autofocused', { static: false}) autoFocused?: ElementRef;

  @Input()
  dvOrigins: Array<DVOrigin> = [];

  @Input()
  dvCategories: Array<DVCategory> = [];

  @Input()
  frontInfos: Array<string> = [];

  @Input()
  dvProductsTable: Array<IdTitleOriginalTitle> = [];

  titles: Map<string, number> = new Map();
  originalTitles: Map<string, number> = new Map();

  editForm: FormGroup = this.fb.group({
    dvOrigin: [{}, Validators.required],
    title: [
      '',
      [Validators.required, this.uniqueValidator(() => this.titles)]
    ],
    originalTitle: [
      '',
      [Validators.compose([this.uniqueValidator(() => this.originalTitles)])]
    ],
    year: [null, Validators.pattern("(1|2)[0-9]{3}")],
    frontInfo: [''],
    description: [''],
    notes: [''],
    dvCategories: [[]]
  });

  filteredFrontInfos: Array<string> = [];

  displayDescription = false;

  constructor(
    private fb: FormBuilder,
    messageService: MessageService,
    crudService: DVProductService) {
    super(messageService, crudService);
  }

  ngOnInit(): void {
    console.log(`editForm origin value: ${JSON.stringify(this.editItem?.dvOrigin || {})}`)
    this.editForm.setValue({
      dvOrigin: this.editItem?.dvOrigin || this.dvOrigins[0] || '',
      title: this.editItem?.title?? '',
      originalTitle: this.editItem?.originalTitle?? '',
      year: this.editItem?.year?? null,
      frontInfo: this.editItem?.frontInfo?? '',
      description: this.editItem?.description?? '',
      notes: this.editItem?.notes?? '',
      dvCategories: this.editItem?.dvCategories?? [],
    })

    if (this.formReadOnly) {
      this.editForm.disable();
    }

    // maps
    this.titles = new Map(this.dvProductsTable.map(v => {return [v.title, v.id]}));
    this.originalTitles = new Map(this.dvProductsTable.map(v => {return [v.originalTitle, v.id]}));
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.nativeElement?.focus();
    }, 200)
  }

  uniqueValidator(mappingFn: (() => Map<string, number>)): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const titleId = mappingFn().get(control.value);
      if (titleId && (!this.editItem?.id || (!!this.editItem?.id && (titleId != this.editItem?.id)))) {
        return {unique: {value: control.value}};
      } else {
        return null;
      }
    }
  }

  override validate(): boolean {
    console.log(`Form errors: ${JSON.stringify(this.editForm.errors)}, form valid: ${this.editForm.valid}, error: ${this.editForm.getError('title')}`)
    return this.editForm.valid;
  }

  createSavedItem(): DVProduct {
    return {
      id: this.editItem?.id,
      artifactTypeId: this.editItem?.artifactTypeId,
      dvOrigin: this.editForm.value.dvOrigin,
      title: this.editForm.value.title,
      originalTitle: this.editForm.value.originalTitle || undefined,
      year: this.editForm.value.year || undefined,
      frontInfo: this.editForm.value.frontInfo || undefined,
      description: this.editForm.value.description || undefined,
      notes: this.editForm.value.notes || undefined,
      dvCategories: this.editForm.value.dvCategories,
    } as DVProduct
  }

  searchFrontInfos(event: any): void {
    this.filteredFrontInfos = filterString(this.frontInfos, event.query);
  }

  previewDescription(): void {
    if (!!this.editForm.value.description) {
      this.displayDescription = true;
    }
  }

  protected readonly String = String;
  protected readonly JSON = JSON;
}
