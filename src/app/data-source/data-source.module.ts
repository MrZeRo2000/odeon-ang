import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSourceService, REST_URL_ENV} from "./rest-data-source.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        REST_URL_ENV,
        RestDataSourceService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class DataSourceModule { }
