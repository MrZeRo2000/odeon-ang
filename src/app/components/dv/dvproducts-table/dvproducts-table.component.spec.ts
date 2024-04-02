import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductsTableComponent } from './dvproducts-table.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";

describe('DVProductsTableComponent', () => {
  let component: DVProductsTableComponent;
  let fixture: ComponentFixture<DVProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        DVProductsTableComponent
      ],
      providers: [
        // primeng
        MessageService,
        ConfirmationService,
      ],
      imports: [
        // angular
        HttpClientTestingModule,
        // custom
        DataSourceModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
