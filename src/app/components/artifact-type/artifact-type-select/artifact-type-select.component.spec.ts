import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactTypeSelectComponent } from './artifact-type-select.component';
import {ArtifactTypeModule} from "../artifact-type.module";

describe('ArtifactTypeSelectComponent', () => {
  let component: ArtifactTypeSelectComponent;
  let fixture: ComponentFixture<ArtifactTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtifactTypeSelectComponent],
      imports: [
        ArtifactTypeModule
      ]
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
