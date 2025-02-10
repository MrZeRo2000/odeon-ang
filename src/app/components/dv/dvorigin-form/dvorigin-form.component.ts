import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {DVOrigin} from "../../../model/dv-product";
import {MessageService} from "primeng/api";
import {DVOriginService} from "../../../service/dvorigin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-dvorigin-form',
    templateUrl: './dvorigin-form.component.html',
    styleUrls: ['./dvorigin-form.component.scss'],
    standalone: false
})
export class DVOriginFormComponent extends BaseCrudFormComponent<DVOrigin> implements OnInit {
  @ViewChild('autofocused', { static: false}) autoFocused?: ElementRef;

  editForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    messageService: MessageService,
    crudService: DVOriginService) {
    super(messageService, crudService);
  }

  ngOnInit(): void {
    this.editForm.setValue({
      name: this.editItem?.name || ''
    })
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.nativeElement?.focus();
    }, 200)
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  createSavedItem(): DVOrigin {
    return {
      id: this.editItem?.id,
      name: this.editForm.value.name
    };
  }
}
