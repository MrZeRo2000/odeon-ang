import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactTypeTreeSelectComponent } from './artifact-type-tree-select.component';

describe('ArtifactTypeTreeSelectComponent', () => {
  let component: ArtifactTypeTreeSelectComponent;
  let fixture: ComponentFixture<ArtifactTypeTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactTypeTreeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactTypeTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
