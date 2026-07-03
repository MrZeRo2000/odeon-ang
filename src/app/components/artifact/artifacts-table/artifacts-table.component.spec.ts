import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ArtifactsTableComponent } from './artifacts-table.component';
import { ArtifactModule } from '../artifact.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('ArtifactsTableComponent', () => {
  let component: ArtifactsTableComponent;
  let fixture: ComponentFixture<ArtifactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtifactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
