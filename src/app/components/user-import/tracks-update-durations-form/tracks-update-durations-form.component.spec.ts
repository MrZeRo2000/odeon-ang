import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksUpdateDurationsFormComponent } from './tracks-update-durations-form.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DatePipe} from "@angular/common";
import {DialogModule} from "primeng/dialog";

describe('TracksUpdateDurationsFormComponent', () => {
  let component: TracksUpdateDurationsFormComponent;
  let fixture: ComponentFixture<TracksUpdateDurationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracksUpdateDurationsFormComponent],
      providers: [
        MessageService,
        ConfirmationService,
        DatePipe,
      ],
      imports: [
        // angular
        HttpClientTestingModule,
        // primeng
        DialogModule,
        // custom
        DataSourceModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksUpdateDurationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
