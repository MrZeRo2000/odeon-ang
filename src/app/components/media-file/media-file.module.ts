import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MediaFileFormComponent} from "./media-file-form/media-file-form.component";
import {MediaFilesTableComponent} from "./media-files-table/media-files-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {CoreModule} from "../../core/core.module";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {MediaFilesLoadFormComponent} from "./media-files-load-form/media-files-load-form.component";
import {ListboxModule} from "primeng/listbox";
import {TextareaModule} from "primeng/textarea";
import {FluidModule} from "primeng/fluid";
import {SelectModule} from "primeng/select";

@NgModule({
  declarations: [
    MediaFileFormComponent,
    MediaFilesTableComponent,
    MediaFilesLoadFormComponent,
  ],
  exports: [
    MediaFileFormComponent,
    MediaFilesTableComponent,
    MediaFilesLoadFormComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        // primeng
        RippleModule,
        TagModule,
        ButtonModule,
        DialogModule,
        TableModule,
        SelectButtonModule,
        AutoCompleteModule,
        MultiSelectModule,
        ConfirmPopupModule,
        InputTextModule,
        ListboxModule,
        TextareaModule,
        SelectModule,
        FluidModule,
        // custom modules
        CoreModule,
        TooltipModule,
    ]
})
export class MediaFileModule { }
