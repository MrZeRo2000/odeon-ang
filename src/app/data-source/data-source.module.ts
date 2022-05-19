import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSourceService, REST_URL_ENV} from "./rest-data-source.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    REST_URL_ENV,
    RestDataSourceService
  ]
})
export class DataSourceModule { }
