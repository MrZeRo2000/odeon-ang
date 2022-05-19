import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSourceService, REST_URL_ENV} from "./rest-data-source.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    REST_URL_ENV,
    RestDataSourceService
  ]
})
export class DataSourceModule { }
