import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksAllTableComponent } from './tracks-all-table.component';

describe('TracksAllTableComponent', () => {
  let component: TracksAllTableComponent;
  let fixture: ComponentFixture<TracksAllTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksAllTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracksAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
