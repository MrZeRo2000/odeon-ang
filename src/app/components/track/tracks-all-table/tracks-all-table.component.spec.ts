import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TracksAllTableComponent } from './tracks-all-table.component';
import { TrackModule } from '../track.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('TracksAllTableComponent', () => {
  let component: TracksAllTableComponent;
  let fixture: ComponentFixture<TracksAllTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TracksAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
