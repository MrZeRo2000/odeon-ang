import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLyricsFormComponent } from './artist-lyrics-form.component';

describe('ArtistLyricsFormComponent', () => {
  let component: ArtistLyricsFormComponent;
  let fixture: ComponentFixture<ArtistLyricsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistLyricsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLyricsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
