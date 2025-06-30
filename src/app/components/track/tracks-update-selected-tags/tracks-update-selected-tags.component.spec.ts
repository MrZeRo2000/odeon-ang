import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksUpdateSelectedTagsComponent } from './tracks-update-selected-tags.component';

describe('TracksUpdateSelectedTagsComponent', () => {
  let component: TracksUpdateSelectedTagsComponent;
  let fixture: ComponentFixture<TracksUpdateSelectedTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksUpdateSelectedTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksUpdateSelectedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
