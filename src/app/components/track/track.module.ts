import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrackFormComponent} from "./track-form/track-form.component";
import {TracksTableComponent} from "./tracks-table/tracks-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {InputTextModule} from "primeng/inputtext";
import {CoreModule} from "../../core/core.module";
import {UserImportModule} from "../user-import/user-import.module";
import {DVModule} from "../dv/d-v.module";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    TrackFormComponent,
    TracksTableComponent,
  ],
  exports: [
    TrackFormComponent,
    TracksTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // primeng
    RippleModule,
    ButtonModule,
    DialogModule,
    TableModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    TooltipModule,
    AutoCompleteModule,
    MultiSelectModule,
    ConfirmPopupModule,
    // custom modules
    CoreModule,
    DVModule,
    UserImportModule,
  ]
})
export class TrackModule { }
