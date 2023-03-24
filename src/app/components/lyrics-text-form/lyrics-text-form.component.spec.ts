import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsTextFormComponent } from './lyrics-text-form.component';
import {DialogModule} from "primeng/dialog";

describe('LyricsTextFormComponent', () => {
  let component: LyricsTextFormComponent;
  let fixture: ComponentFixture<LyricsTextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogModule
      ],
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
