import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DVCategoryFormComponent} from "./dvcategory-form/dvcategory-form.component";
import {DVCategoriesTableComponent} from "./dvcategories-table/dvcategories-table.component";
import {DVOriginFormComponent} from "./dvorigin-form/dvorigin-form.component";
import {DVOriginsTableComponent} from "./dvorigins-table/dvorigins-table.component";
import {DVProductFormComponent} from "./dvproduct-form/dvproduct-form.component";
import {DVProductsTableComponent} from "./dvproducts-table/dvproducts-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";
import {ChipModule} from "primeng/chip";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {UserImportModule} from "../user-import/user-import.module";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {TooltipModule} from "primeng/tooltip";
import {DVProductsImportFormComponent} from "./dvproducts-import-form/dvproducts-import-form.component";
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {FluidModule} from "primeng/fluid";
import {TextareaModule} from "primeng/textarea";


@NgModule({
  declarations: [
    DVOriginFormComponent,
    DVOriginsTableComponent,
    DVCategoryFormComponent,
    DVCategoriesTableComponent,
    DVProductFormComponent,
    DVProductsTableComponent,
    DVProductsImportFormComponent,
  ],
  exports: [
    DVOriginFormComponent,
    DVOriginsTableComponent,
    DVCategoryFormComponent,
    DVCategoriesTableComponent,
    DVProductFormComponent,
    DVProductsTableComponent,
    DVProductsImportFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // primeng
    ChipModule,
    InputTextModule,
    RippleModule,
    TagModule,
    ButtonModule,
    DialogModule,
    TableModule,
    SelectButtonModule,
    AutoCompleteModule,
    MultiSelectModule,
    ConfirmPopupModule,
    InputNumberModule,
    DropdownModule,
    TooltipModule,
    TabViewModule,
    IconField,
    InputIcon,
    FluidModule,
    TextareaModule,
    // custom modules
    CoreModule,
    UserImportModule,
  ]
})
export class DVModule { }
