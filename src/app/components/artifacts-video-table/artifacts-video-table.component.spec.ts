import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsVideoTableComponent } from './artifacts-video-table.component';

describe('ArtifactsVideoTableComponent', () => {
  let component: ArtifactsVideoTableComponent;
  let fixture: ComponentFixture<ArtifactsVideoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtifactsVideoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactsVideoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
