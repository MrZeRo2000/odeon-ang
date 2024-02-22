import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DVProductsImportFormComponent} from "./dvproducts-import-form/dvproducts-import-form.component";
import {
  UserImportResultFormComponent
} from "./user-import-result-form/user-import-result-form.component";
import {DialogModule} from "primeng/dialog";
import {PanelModule} from "primeng/panel";
import {TabViewModule} from "primeng/tabview";
import {MultiSelectModule} from "primeng/multiselect";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import { TracksImportFormComponent } from './tracks-import-form/tracks-import-form.component';
import {InputNumberModule} from "primeng/inputnumber";
import {
  TracksUpdateDurationsFormComponent
} from "./tracks-update-durations-form/tracks-update-durations-form.component";


@NgModule({
  declarations: [
    DVProductsImportFormComponent,
    TracksImportFormComponent,
    UserImportResultFormComponent,
    TracksUpdateDurationsFormComponent,
  ],
  exports: [
    DVProductsImportFormComponent,
    TracksImportFormComponent,
    UserImportResultFormComponent,
    TracksUpdateDurationsFormComponent,
  ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        DialogModule,
        PanelModule,
        TabViewModule,
        MultiSelectModule,
        AutoCompleteModule,
        DropdownModule,
        InputTextareaModule,
        ButtonModule,
        RippleModule,
        InputNumberModule
    ]
})
export class UserImportModule { }
