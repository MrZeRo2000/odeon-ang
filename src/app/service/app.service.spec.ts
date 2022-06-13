import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import {DataSourceModule} from "../data-source/data-source.module";

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataSourceModule
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
