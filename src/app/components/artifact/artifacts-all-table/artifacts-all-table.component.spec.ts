import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsAllTableComponent } from './artifacts-all-table.component';

describe('ArtifactsAllTableComponent', () => {
  let component: ArtifactsAllTableComponent;
  let fixture: ComponentFixture<ArtifactsAllTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactsAllTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtifactsAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
