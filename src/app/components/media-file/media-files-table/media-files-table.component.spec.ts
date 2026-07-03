import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MediaFilesTableComponent } from './media-files-table.component';
import { MediaFileModule } from '../media-file.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('MediaFilesTableComponent', () => {
  let component: MediaFilesTableComponent;
  let fixture: ComponentFixture<MediaFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFileModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
