import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactTypeSelectComponent } from './artifact-type-select.component';

describe('ArtifactTypeSelectComponent', () => {
  let component: ArtifactTypeSelectComponent;
  let fixture: ComponentFixture<ArtifactTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactTypeSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtifactTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
