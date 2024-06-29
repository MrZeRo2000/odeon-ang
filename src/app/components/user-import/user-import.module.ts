import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {
  UserImportResultFormComponent
} from "./user-import-result-form/user-import-result-form.component";
import {DialogModule} from "primeng/dialog";
import {PanelModule} from "primeng/panel";
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
import {
  TracksUpdateVideoTypesFormComponent
} from "./tracks-update-video-types-form/tracks-update-video-types-form.component";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    TracksImportFormComponent,
    UserImportResultFormComponent,
    TracksUpdateDurationsFormComponent,
    TracksUpdateVideoTypesFormComponent,
  ],
  exports: [
    TracksImportFormComponent,
    UserImportResultFormComponent,
    TracksUpdateDurationsFormComponent,
    TracksUpdateVideoTypesFormComponent,
  ],
  imports: [
      ReactiveFormsModule,
      CommonModule,
      DialogModule,
      PanelModule,
      MultiSelectModule,
      AutoCompleteModule,
      DropdownModule,
      InputTextareaModule,
      ButtonModule,
      RippleModule,
      InputNumberModule,
      TooltipModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class UserImportModule { }
