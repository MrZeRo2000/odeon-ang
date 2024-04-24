import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactTagsFormComponent } from './artifact-tags-form.component';

describe('ArtifactTagsFormComponent', () => {
  let component: ArtifactTagsFormComponent;
  let fixture: ComponentFixture<ArtifactTagsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactTagsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtifactTagsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
