import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVOriginsTableComponent } from './dvorigins-table.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DVOriginsTableComponent', () => {
  let component: DVOriginsTableComponent;
  let fixture: ComponentFixture<DVOriginsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DVOriginsTableComponent
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

    fixture = TestBed.createComponent(DVOriginsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
