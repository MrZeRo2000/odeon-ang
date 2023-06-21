import {Component, OnInit} from '@angular/core';
import {BaseCrudFormComponent} from "../base/base-crud-form.component";
import {DVCategory} from "../../model/dv-product";
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DVCategoryService} from "../../service/dvcategory.service";

@Component({
  selector: 'app-dvcategory-form',
  templateUrl: './dvcategory-form.component.html',
  styleUrls: ['./dvcategory-form.component.scss']
})
export class DVCategoryFormComponent extends BaseCrudFormComponent<DVCategory> implements OnInit {

  editForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    messageService: MessageService,
    crudService: DVCategoryService) {
    super(messageService, crudService);
  }

  ngOnInit(): void {
    this.editForm.setValue({
      name: this.editItem?.name || ''
    })
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  createSavedItem(): DVCategory {
    return {
      id: this.editItem?.id,
      name: this.editForm.value.name
    };
  }
}
