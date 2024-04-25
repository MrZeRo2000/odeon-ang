import { TestBed } from '@angular/core/testing';

import { ArtifactTagService } from './artifact-tag.service';

describe('ArtifactTagService', () => {
  let service: ArtifactTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtifactTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
