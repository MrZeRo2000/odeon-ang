import {Component, Input} from '@angular/core';
import {BaseFormComponent} from "../base/base-form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DVCategory, DVOrigin} from "../../model/dv-product";

@Component({
  selector: 'app-dvproducts-import-form',
  templateUrl: './dvproducts-import-form.component.html',
  styleUrls: ['./dvproducts-import-form.component.scss']
})
export class DVProductsImportFormComponent extends BaseFormComponent {

  @Input()
  artifactTypeId: number = 0;

  @Input()
  dvOrigins: Array<DVOrigin> = [];

  @Input()
  dvCategories: Array<DVCategory> = [];

  @Input()
  frontInfos: Array<string> = [];

  editForm: FormGroup = this.fb.group({
    dvOrigin: ['', Validators.required],
    frontInfo: [''],
    dvCategories: [[]],
    titles: ['', Validators.required],
    originalTitles: [''],
    years: [''],
  });

  constructor(private fb: FormBuilder,) {
    super();
  }
}
