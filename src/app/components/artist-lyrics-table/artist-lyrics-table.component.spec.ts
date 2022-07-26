import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLyricsTableComponent } from './artist-lyrics-table.component';

describe('ArtistLyricsTableComponent', () => {
  let component: ArtistLyricsTableComponent;
  let fixture: ComponentFixture<ArtistLyricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistLyricsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLyricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
