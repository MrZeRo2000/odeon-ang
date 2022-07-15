import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFilesTableComponent } from './media-files-table.component';

describe('MediaFilesTableComponent', () => {
  let component: MediaFilesTableComponent;
  let fixture: ComponentFixture<MediaFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaFilesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
