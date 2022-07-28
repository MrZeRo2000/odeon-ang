import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsTextFormComponent } from './lyrics-text-form.component';

describe('LyricsTextFormComponent', () => {
  let component: LyricsTextFormComponent;
  let fixture: ComponentFixture<LyricsTextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricsTextFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricsTextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
