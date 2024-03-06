import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksUpdateVideoTypesFormComponent } from './tracks-update-video-types-form.component';

describe('TracksUpdateVideoTypesComponent', () => {
  let component: TracksUpdateVideoTypesFormComponent;
  let fixture: ComponentFixture<TracksUpdateVideoTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksUpdateVideoTypesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksUpdateVideoTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
