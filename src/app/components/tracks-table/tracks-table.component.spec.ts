import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksTableComponent } from './tracks-table.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DecimalPipe} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {DataSourceModule} from "../../data-source/data-source.module";
import {LoadingComponent} from "../loading/loading.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

describe('TracksTableComponent', () => {
  let component: TracksTableComponent;
  let fixture: ComponentFixture<TracksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //standard
        HttpClientTestingModule,
        RouterTestingModule,
        //custom
        DataSourceModule,
      ],
      providers: [
        DecimalPipe,
        MessageService,
        ConfirmationService,
      ],
      declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        TracksTableComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
