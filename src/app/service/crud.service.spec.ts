import { TestBed } from '@angular/core/testing';

import { CRUDService } from './crud.service';
import {MediaFileService} from "./media-file.service";

describe('CRUDService', () => {
  let service: CRUDService<MediaFileService>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
