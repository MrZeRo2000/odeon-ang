import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DecimalPipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TracksTableComponent } from './tracks-table.component';
import { TrackModule } from '../track.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('TracksTableComponent', () => {
  let component: TracksTableComponent;
  let fixture: ComponentFixture<TracksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackModule, RouterTestingModule, DataSourceModule],
      providers: [
        DecimalPipe,
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TracksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
