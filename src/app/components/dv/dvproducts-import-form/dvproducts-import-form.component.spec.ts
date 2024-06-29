import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductsImportFormComponent } from './dvproducts-import-form.component';
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";

describe('DVProductsImportFormComponent', () => {
  let component: DVProductsImportFormComponent;
  let fixture: ComponentFixture<DVProductsImportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DVProductsImportFormComponent
      ],
      providers: [
        MessageService
      ],
      imports: [
        // angular
        HttpClientTestingModule,
        // primeng
        DialogModule,
        // custom
        DataSourceModule,
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
