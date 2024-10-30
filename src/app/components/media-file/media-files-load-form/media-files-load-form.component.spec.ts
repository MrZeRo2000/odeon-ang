import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFilesLoadFormComponent } from './media-files-load-form.component';
import {MediaFileModule} from "../media-file.module";
import {MessageService} from "primeng/api";
import {REST_URL_ENV} from "../../../data-source/rest-data-source.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('MediaFilesLoadFormComponent', () => {
  let component: MediaFilesLoadFormComponent;
  let fixture: ComponentFixture<MediaFilesLoadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaFilesLoadFormComponent],
      imports: [MediaFileModule],
      providers: [
        MessageService,
        REST_URL_ENV,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaFilesLoadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
