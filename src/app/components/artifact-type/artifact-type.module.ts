import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtifactTypeSelectComponent} from "./artifact-type-select/artifact-type-select.component";
import {SelectButtonModule} from "primeng/selectbutton";



@NgModule({
  declarations: [
    ArtifactTypeSelectComponent,
  ],
  exports: [
    ArtifactTypeSelectComponent
  ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        //primeng modules
        SelectButtonModule,
        FormsModule,
    ]
})
export class ArtifactTypeModule { }
