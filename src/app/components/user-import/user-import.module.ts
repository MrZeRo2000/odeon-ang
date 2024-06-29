import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  UserImportResultFormComponent
} from "./user-import-result-form/user-import-result-form.component";
import {DialogModule} from "primeng/dialog";
import {PanelModule} from "primeng/panel";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    UserImportResultFormComponent,
  ],
  exports: [
    UserImportResultFormComponent,
  ],
  imports: [
      ReactiveFormsModule,
      CommonModule,
      DialogModule,
      PanelModule,
      ButtonModule,
      RippleModule,
  ],
})
export class UserImportModule { }
