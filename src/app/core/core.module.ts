import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArtifactCaptionPipe} from "./pipes/artifact-caption.pipe";
import {FileSizePipe} from "./pipes/file-size-pipe.pipe";
import {ProcessingStatusNamePipe} from "./pipes/processing-status-name.pipe";
import {ProcessorTypeNamePipe} from "./pipes/processor-type-name.pipe";
import {CrudPanelComponent} from "./components/crud-panel/crud-panel.component";
import {LoadingComponent} from "./components/loading/loading.component";
import {ProgressBarModule} from "primeng/progressbar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RippleModule} from "primeng/ripple";
import {TextViewDialogComponent} from "./components/text-view-dialog/text-view-dialog.component";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";


@NgModule({
  declarations: [
    //pipes
    ArtifactCaptionPipe,
    FileSizePipe,
    ProcessingStatusNamePipe,
    ProcessorTypeNamePipe,
    // components
    CrudPanelComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    TextViewDialogComponent,
  ],
  exports: [
    // pipes
    ArtifactCaptionPipe,
    FileSizePipe,
    ProcessingStatusNamePipe,
    ProcessorTypeNamePipe,
    // components
    CrudPanelComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    TextViewDialogComponent,
  ],
  imports: [
    CommonModule,
    ProgressBarModule, // for loading
    DialogModule, // for text view dialog
    ConfirmDialogModule, // for confirm dialog
    RippleModule,
  ]
})
export class CoreModule { }
