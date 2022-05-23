import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppService} from "./app.service";
import {ProcessService} from "./process.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppService,
    ProcessService
  ]
})
export class ServiceModule { }
