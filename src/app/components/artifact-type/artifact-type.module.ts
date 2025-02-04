import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtifactTypeSelectComponent} from "./artifact-type-select/artifact-type-select.component";
import {SelectButtonModule} from "primeng/selectbutton";
import {FluidModule} from "primeng/fluid";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    ArtifactTypeSelectComponent,
  ],
  exports: [
    ArtifactTypeSelectComponent
  ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        //primeng modules
        ButtonModule,
        SelectButtonModule,
        FluidModule,
    ]
})
export class ArtifactTypeModule { }
