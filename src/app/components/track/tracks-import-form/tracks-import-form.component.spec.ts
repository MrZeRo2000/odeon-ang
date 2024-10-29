import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksImportFormComponent } from './tracks-import-form.component';
import {DialogModule} from "primeng/dialog";
import {MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TrackImportFormComponent', () => {
  let component: TracksImportFormComponent;
  let fixture: ComponentFixture<TracksImportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [
        TracksImportFormComponent,
    ],
    imports: [
        // primeng
        DialogModule,
        // custom
        DataSourceModule],
    providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
