import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MediaFilesLoadFormComponent } from './media-files-load-form.component';
import { MediaFileModule } from '../media-file.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('MediaFilesLoadFormComponent', () => {
  let component: MediaFilesLoadFormComponent;
  let fixture: ComponentFixture<MediaFilesLoadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFileModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaFilesLoadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
