import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaggedFormComponent} from "./tagged-form/tagged-form.component";


@NgModule({
  declarations: [
    TaggedFormComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TaggedFormComponent
  ]
})
export class TaggedModule { }
