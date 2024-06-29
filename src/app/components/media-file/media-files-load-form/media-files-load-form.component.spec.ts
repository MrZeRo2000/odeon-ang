import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFilesLoadFormComponent } from './media-files-load-form.component';

describe('MediaFilesLoadFormComponent', () => {
  let component: MediaFilesLoadFormComponent;
  let fixture: ComponentFixture<MediaFilesLoadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFilesLoadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaFilesLoadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
