import {Component, Input, OnInit} from '@angular/core';
import {BaseFormComponent} from "../base/base-form.component";
import {DVCategory, DVOrigin, DVProduct} from "../../model/dv-product";
import {MessageService} from "primeng/api";
import {DVProductService} from "../../service/dvproduct.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filterString} from "../../utils/search-utils";

@Component({
  selector: 'app-dvproduct-form',
  templateUrl: './dvproduct-form.component.html',
  styleUrls: ['./dvproduct-form.component.scss']
})
export class DVProductFormComponent extends BaseFormComponent<DVProduct> implements OnInit {

  @Input()
  dvOrigins: Array<DVOrigin> = [];

  @Input()
  dvCategories: Array<DVCategory> = [];

  @Input()
  frontInfos: Array<string> = [];

  editForm: FormGroup = this.fb.group({
    dvOrigin: [{}, Validators.required],
    title: ['', Validators.required],
    originalTitle: [''],
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
      dvOrigin: this.editItem?.dvOrigin || this.dvOrigins[0],
      title: this.editItem?.title || '',
      originalTitle: this.editItem?.originalTitle || '',
      year: this.editItem?.year || null,
      frontInfo: this.editItem?.frontInfo || '',
      description: this.editItem?.description || '',
      notes: this.editItem?.notes || '',
      dvCategories: this.editItem?.dvCategories || [],
    })
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  createSavedItem(): DVProduct {
    console.log(`savedItem origin value: ${JSON.stringify(this.editForm.value.dvOrigin)}`)
    return {
      id: this.editItem?.id,
      artifactTypeId: this.editItem?.artifactTypeId,
      dvOrigin: this.editForm.value.dvOrigin,
      title: this.editForm.value.title,
      originalTitle: this.editForm.value.originalTitle,
      year: this.editForm.value.year,
      frontInfo: this.editForm.value.frontInfo,
      description: this.editForm.value.description,
      notes: this.editForm.value.notes,
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

}
