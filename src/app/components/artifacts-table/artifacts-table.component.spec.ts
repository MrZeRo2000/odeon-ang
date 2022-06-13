import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsTableComponent } from './artifacts-table.component';

describe('ArtifactsTableComponent', () => {
  let component: ArtifactsTableComponent;
  let fixture: ComponentFixture<ArtifactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
