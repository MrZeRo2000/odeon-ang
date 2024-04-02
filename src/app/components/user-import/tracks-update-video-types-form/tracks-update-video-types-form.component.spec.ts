import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksUpdateVideoTypesFormComponent } from './tracks-update-video-types-form.component';
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";

describe('TracksUpdateVideoTypesFormComponent', () => {
  let component: TracksUpdateVideoTypesFormComponent;
  let fixture: ComponentFixture<TracksUpdateVideoTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TracksUpdateVideoTypesFormComponent
      ],
      providers: [
        // primeng
        MessageService,
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

    fixture = TestBed.createComponent(TracksUpdateVideoTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
