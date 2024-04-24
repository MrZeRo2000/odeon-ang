import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArtifactFormComponent} from "./artifact-form/artifact-form.component";
import {ArtifactsTableComponent} from "./artifacts-table/artifacts-table.component";
import {ArtifactsVideoTableComponent} from "./artifacts-video-table/artifacts-video-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {CoreModule} from "../../core/core.module";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {MultiSelectModule} from "primeng/multiselect";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import {ChipModule} from "primeng/chip";


@NgModule({
  declarations: [
    ArtifactFormComponent,
    ArtifactsTableComponent,
    ArtifactsVideoTableComponent,
  ],
  exports: [
    ArtifactFormComponent,
    ArtifactsTableComponent,
    ArtifactsVideoTableComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // primeng
        ButtonModule,
        RippleModule,
        ChipsModule,
        DialogModule,
        TableModule,
        SelectButtonModule,
        AutoCompleteModule,
        MultiSelectModule,
        // custom modules
        CoreModule,
        ChipModule,
    ]
})
export class ArtifactModule { }
