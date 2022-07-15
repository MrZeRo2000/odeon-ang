import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFileFormComponent } from './media-file-form.component';

describe('MediaFileFormComponent', () => {
  let component: MediaFileFormComponent;
  let fixture: ComponentFixture<MediaFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaFileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
