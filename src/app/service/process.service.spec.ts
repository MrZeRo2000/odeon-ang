import { TestBed } from '@angular/core/testing';

import { ProcessService } from './process.service';
import {DataSourceModule} from "../data-source/data-source.module";

describe('ProcessService', () => {
  let service: ProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataSourceModule]
    });
    service = TestBed.inject(ProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
