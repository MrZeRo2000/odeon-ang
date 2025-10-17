import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtifactTypeSelectComponent} from "./artifact-type-select/artifact-type-select.component";
import {SelectButtonModule} from "primeng/selectbutton";
import {FluidModule} from "primeng/fluid";
import {ButtonModule} from "primeng/button";
import {ArtifactTypeTreeSelectComponent} from "./artifact-type-tree-select/artifact-type-tree-select.component";
import {TreeSelectModule} from "primeng/treeselect";



@NgModule({
  declarations: [
    ArtifactTypeSelectComponent,
    ArtifactTypeTreeSelectComponent,
  ],
  exports: [
    ArtifactTypeSelectComponent,
    ArtifactTypeTreeSelectComponent,
  ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        //primeng modules
        ButtonModule,
        SelectButtonModule,
        TreeSelectModule,
        FluidModule,
    ]
})
export class ArtifactTypeModule { }
