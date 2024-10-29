import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductsTableComponent } from './dvproducts-table.component';
import {ConfirmationService, MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
    imports: [
        // custom
        DataSourceModule],
    providers: [
        // primeng
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
