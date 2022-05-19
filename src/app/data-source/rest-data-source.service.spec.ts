import { TestBed } from '@angular/core/testing';

import {REST_URL_ENV, RestDataSourceService} from './rest-data-source.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RestDataSourceService',() => {
  let service: RestDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [REST_URL_ENV]
      },
    )
    ;
    service = TestBed.inject(RestDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('restUrl', () => {
    // @ts-ignore
    expect(service.restUrl).toEqual('http://localhost:8080/odeon-int-wss/api/')
  })
});
