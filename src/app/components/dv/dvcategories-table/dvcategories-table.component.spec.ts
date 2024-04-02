import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVCategoriesTableComponent } from './dvcategories-table.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {LayoutModule} from "../../layout/layout.module";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";

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
      providers: [
        MessageService,
        ConfirmationService,
      ],
      imports: [
        // angular
        HttpClientTestingModule,
        // primeng
        // custom
        DataSourceModule,
        LayoutModule,
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
