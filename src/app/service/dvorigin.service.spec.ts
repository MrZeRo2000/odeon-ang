import { TestBed } from '@angular/core/testing';

import { DVOriginService } from './dvorigin.service';

describe('DVOriginService', () => {
  let service: DVOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DVOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
