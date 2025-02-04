import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import {
  TracksUpdateVideoTypesFormComponent
} from "./tracks-update-video-types-form/tracks-update-video-types-form.component";
import {
  TracksUpdateDurationsFormComponent
} from "./tracks-update-durations-form/tracks-update-durations-form.component";
import {TracksImportFormComponent} from "./tracks-import-form/tracks-import-form.component";
import {TracksAllTableComponent} from "./tracks-all-table/tracks-all-table.component";
import {ArtifactTypeModule} from "../artifact-type/artifact-type.module";
import {TextareaModule} from "primeng/textarea";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";


@NgModule({
  declarations: [
    TrackFormComponent,
    TracksTableComponent,
    TracksAllTableComponent,
    TracksImportFormComponent,
    TracksUpdateDurationsFormComponent,
    TracksUpdateVideoTypesFormComponent,
  ],
  exports: [
    TrackFormComponent,
    TracksTableComponent,
    TracksAllTableComponent,
    TracksImportFormComponent,
    TracksUpdateDurationsFormComponent,
    TracksUpdateVideoTypesFormComponent,
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
        TextareaModule,
        IconFieldModule,
        InputIconModule,
        // custom modules
        CoreModule,
        DVModule,
        UserImportModule,
        ArtifactTypeModule,
    ],
  providers: [
    DatePipe,
  ]
})
export class TrackModule { }
