import {Component, Input, OnInit} from '@angular/core';
import {BaseCrudFormComponent} from "../base/base-crud-form.component";
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
export class DVProductFormComponent extends BaseCrudFormComponent<DVProduct> implements OnInit {

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
      title: this.editItem?.title?? '',
      originalTitle: this.editItem?.originalTitle?? '',
      year: this.editItem?.year?? null,
      frontInfo: this.editItem?.frontInfo?? '',
      description: this.editItem?.description?? '',
      notes: this.editItem?.notes?? '',
      dvCategories: this.editItem?.dvCategories?? [],
    })
  }

  override validate(): boolean {
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

}
