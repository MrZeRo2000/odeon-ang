import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcessingStatusIndicatorComponent} from "./processing-status-indicator/processing-status-indicator.component";
import {ProcessingFormComponent} from "./processing-form/processing-form.component";
import {ProgressBarModule} from "primeng/progressbar";
import {TableModule} from "primeng/table";
import {TreeModule} from "primeng/tree";
import {CoreModule} from "../../core/core.module";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [
    ProcessingStatusIndicatorComponent,
    ProcessingFormComponent,
  ],
  exports: [
    ProcessingStatusIndicatorComponent,
    ProcessingFormComponent,
  ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      // primeng
      TableModule,
      TreeModule,
      ProgressBarModule,
      ButtonModule,
      RippleModule,
      DropdownModule,
      PanelModule,
      //
      CoreModule,
    ]
})
export class ProcessingModule { }
