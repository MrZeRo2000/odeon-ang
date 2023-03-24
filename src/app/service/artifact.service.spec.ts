import { TestBed } from '@angular/core/testing';

import { ArtifactService } from './artifact.service';
import {ServiceModule} from "./service.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../data-source/data-source.module";

describe('ArtifactService', () => {
  let service: ArtifactService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [
          //standard
          HttpClientTestingModule,
          //custom
          DataSourceModule,
          ServiceModule,
        ],
      });
    service = TestBed.inject(ArtifactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
