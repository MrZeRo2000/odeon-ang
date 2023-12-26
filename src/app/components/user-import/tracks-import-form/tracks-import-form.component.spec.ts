import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksImportFormComponent } from './tracks-import-form.component';

describe('TrackImportFormComponent', () => {
  let component: TracksImportFormComponent;
  let fixture: ComponentFixture<TracksImportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TracksImportFormComponent]
    });
    fixture = TestBed.createComponent(TracksImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
