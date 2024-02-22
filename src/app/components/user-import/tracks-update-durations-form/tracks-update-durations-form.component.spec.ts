import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksUpdateDurationsFormComponent } from './tracks-update-durations-form.component';

describe('TracksUpdateDurationsFormComponent', () => {
  let component: TracksUpdateDurationsFormComponent;
  let fixture: ComponentFixture<TracksUpdateDurationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksUpdateDurationsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracksUpdateDurationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
