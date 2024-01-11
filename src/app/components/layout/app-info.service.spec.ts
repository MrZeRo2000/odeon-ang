import { TestBed } from '@angular/core/testing';

import { AppInfoService } from './app-info.service';
import {DataSourceModule} from "../../data-source/data-source.module";

describe('AppService', () => {
  let service: AppInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataSourceModule
      ]
    });
    service = TestBed.inject(AppInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
