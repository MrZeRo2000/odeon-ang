import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactTagsFormComponent } from './artifact-tags-form.component';
import {ArtifactModule} from "../artifact.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {REST_URL_ENV} from "../../../data-source/rest-data-source.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('ArtifactTagsFormComponent', () => {
  let component: ArtifactTagsFormComponent;
  let fixture: ComponentFixture<ArtifactTagsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtifactTagsFormComponent],
      imports: [ArtifactModule],
      providers: [
        MessageService,
        ConfirmationService,
        REST_URL_ENV,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactTagsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
