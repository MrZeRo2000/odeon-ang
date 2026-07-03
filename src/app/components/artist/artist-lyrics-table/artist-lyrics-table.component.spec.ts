import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ArtistLyricsTableComponent } from './artist-lyrics-table.component';
import { ArtistModule } from '../artist.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('ArtistLyricsTableComponent', () => {
  let component: ArtistLyricsTableComponent;
  let fixture: ComponentFixture<ArtistLyricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistLyricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
