import { TestBed } from '@angular/core/testing';

import { DVOriginService } from './dvorigin.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../data-source/data-source.module";

describe('DVOriginService', () => {
  let service: DVOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // angular
        HttpClientTestingModule,
        // custom
        DataSourceModule,
      ]
    });
    service = TestBed.inject(DVOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
