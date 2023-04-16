import { Component } from '@angular/core';
import {BaseFormComponent} from "../base/base-form.component";
import {DVProduct} from "../../model/dv-product";
import {MessageService} from "primeng/api";
import {DVProductService} from "../../service/dvproduct.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dvproduct-form',
  templateUrl: './dvproduct-form.component.html',
  styleUrls: ['./dvproduct-form.component.scss']
})
export class DVProductFormComponent extends BaseFormComponent<DVProduct>{

  editForm: FormGroup = this.fb.group({
    dvOrigin: ['', Validators.required],
    title: ['', Validators.required],
    originalTitle: [''],
    year: ['', Validators.pattern("(1|2)[0-9]{3}")],
    frontInfo: [''],
    description: [''],
    notes: [''],
    dvCategories: [[]]
  });

  constructor(
    private fb: FormBuilder,
    messageService: MessageService,
    crudService: DVProductService) {
    super(messageService, crudService);
  }

  createSavedItem(): DVProduct {
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

}
