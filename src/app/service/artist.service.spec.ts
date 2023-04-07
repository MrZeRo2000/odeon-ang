import { TestBed } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import {DataSourceModule} from "../data-source/data-source.module";

describe('ArtistService', () => {
  let service: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataSourceModule
      ]
    });
    service = TestBed.inject(ArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
