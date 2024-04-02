import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksImportFormComponent } from './tracks-import-form.component';
import {DialogModule} from "primeng/dialog";
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";

describe('TrackImportFormComponent', () => {
  let component: TracksImportFormComponent;
  let fixture: ComponentFixture<TracksImportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TracksImportFormComponent,
      ],
      providers: [
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
    });
    fixture = TestBed.createComponent(TracksImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
