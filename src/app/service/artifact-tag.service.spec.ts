import { TestBed } from '@angular/core/testing';

import { ArtifactTagService } from './artifact-tag.service';
import {REST_URL_ENV} from "../data-source/rest-data-source.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('ArtifactTagService', () => {
  let service: ArtifactTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        REST_URL_ENV,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ArtifactTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
