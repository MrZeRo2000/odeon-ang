import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksAllTableComponent } from './tracks-all-table.component';
import {TrackModule} from "../track.module";
import {RouterModule} from "@angular/router";
import {MessageService} from "primeng/api";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {REST_URL_ENV} from "../../../data-source/rest-data-source.service";

describe('TracksAllTableComponent', () => {
  let component: TracksAllTableComponent;
  let fixture: ComponentFixture<TracksAllTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracksAllTableComponent],
      imports: [
        RouterModule. forRoot(
          [{path: '', component: TracksAllTableComponent}, {path: 'simple', component: TracksAllTableComponent}]
        ),
        TrackModule
      ],
      providers: [
        MessageService,
        REST_URL_ENV,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
