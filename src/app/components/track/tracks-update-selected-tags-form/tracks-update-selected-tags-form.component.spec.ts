import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksUpdateSelectedTagsFormComponent } from './tracks-update-selected-tags-form.component';

describe('TracksUpdateSelectedTagsComponent', () => {
  let component: TracksUpdateSelectedTagsFormComponent;
  let fixture: ComponentFixture<TracksUpdateSelectedTagsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksUpdateSelectedTagsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksUpdateSelectedTagsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
