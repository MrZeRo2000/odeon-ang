import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductFormComponent } from './dvproduct-form.component';
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";

describe('DVProductFormComponent', () => {
  let component: DVProductFormComponent;
  let fixture: ComponentFixture<DVProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DVProductFormComponent
      ],
      providers: [
        MessageService,
      ],
      imports: [
        // angular
        HttpClientTestingModule,
        // primeng
        DialogModule,
        ConfirmDialogModule,
        // custom
        DataSourceModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
