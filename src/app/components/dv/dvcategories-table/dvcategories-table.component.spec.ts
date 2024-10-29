import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVCategoriesTableComponent } from './dvcategories-table.component';
import {ConfirmationService, MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {LayoutModule} from "../../layout/layout.module";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DVCategoriesTableComponent', () => {
  let component: DVCategoriesTableComponent;
  let fixture: ComponentFixture<DVCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        DVCategoriesTableComponent
    ],
    imports: [
        // primeng
        // custom
        DataSourceModule,
        LayoutModule],
    providers: [
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(DVCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
