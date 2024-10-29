import { TestBed } from '@angular/core/testing';

import { ArtifactService } from './artifact.service';
import {ServiceModule} from "./service.module";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../data-source/data-source.module";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtifactService', () => {
  let service: ArtifactService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
    imports: [
        //custom
        DataSourceModule,
        ServiceModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ArtifactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
