import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TracksUpdateSelectedTagsFormComponent } from './tracks-update-selected-tags-form.component';
import { TrackModule } from '../track.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('TracksUpdateSelectedTagsComponent', () => {
  let component: TracksUpdateSelectedTagsFormComponent;
  let fixture: ComponentFixture<TracksUpdateSelectedTagsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TracksUpdateSelectedTagsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
