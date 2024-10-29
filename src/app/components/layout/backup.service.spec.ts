import { TestBed } from '@angular/core/testing';

import { BackupService } from './backup.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../data-source/data-source.module";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BackupService', () => {
  let service: BackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [DataSourceModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(BackupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
