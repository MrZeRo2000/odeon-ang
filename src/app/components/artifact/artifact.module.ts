import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArtifactFormComponent} from "./artifact-form/artifact-form.component";
import {ArtifactTagsFormComponent} from "./artifact-tags-form/artifact-tags-form.component";
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
import {ChipModule} from "primeng/chip";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {ArtifactsAllTableComponent} from "./artifacts-all-table/artifacts-all-table.component";
import {ArtifactTypeModule} from "../artifact-type/artifact-type.module";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FluidModule} from "primeng/fluid";


@NgModule({
  declarations: [
    ArtifactFormComponent,
    ArtifactTagsFormComponent,
    ArtifactsTableComponent,
    ArtifactsVideoTableComponent,
    ArtifactsAllTableComponent,
  ],
  exports: [
    ArtifactFormComponent,
    ArtifactTagsFormComponent,
    ArtifactsTableComponent,
    ArtifactsVideoTableComponent,
    ArtifactsAllTableComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // primeng
        ButtonModule,
        RippleModule,
        DialogModule,
        TableModule,
        SelectButtonModule,
        AutoCompleteModule,
        MultiSelectModule,
        CoreModule,
        ChipModule,
        ConfirmPopupModule,
        DropdownModule,
        TagModule,
        FluidModule,
        // custom modules
        ArtifactTypeModule,
        IconField,
        InputIcon,
        InputText,
    ]
})
export class ArtifactModule { }
