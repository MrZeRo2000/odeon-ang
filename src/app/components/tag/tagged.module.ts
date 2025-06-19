import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaggedFormComponent} from "./tagged-form/tagged-form.component";
import {AutoComplete} from "primeng/autocomplete";
import {ButtonDirective} from "primeng/button";
import {ConfirmPopup} from "primeng/confirmpopup";
import {Dialog} from "primeng/dialog";
import {Fluid} from "primeng/fluid";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";


@NgModule({
  declarations: [
    TaggedFormComponent
  ],
  imports: [
    CommonModule,
    AutoComplete,
    ButtonDirective,
    ConfirmPopup,
    Dialog,
    Fluid,
    FormsModule,
    PrimeTemplate,
    ReactiveFormsModule,
    Ripple,
  ],
  exports: [
    TaggedFormComponent
  ]
})
export class TaggedModule { }
