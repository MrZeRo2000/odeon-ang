import { TestBed } from '@angular/core/testing';

import { DVOriginService } from './dvorigin.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../data-source/data-source.module";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DVOriginService', () => {
  let service: DVOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        // custom
        DataSourceModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(DVOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
