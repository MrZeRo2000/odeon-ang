import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductsImportFormComponent } from './dvproducts-import-form.component';
import {MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DVProductsImportFormComponent', () => {
  let component: DVProductsImportFormComponent;
  let fixture: ComponentFixture<DVProductsImportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [
        DVProductsImportFormComponent
    ],
    imports: [
        // primeng
        DialogModule,
        // custom
        DataSourceModule],
    providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(DVProductsImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
