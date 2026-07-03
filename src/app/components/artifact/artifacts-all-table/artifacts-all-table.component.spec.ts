import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ArtifactsAllTableComponent } from './artifacts-all-table.component';
import { ArtifactModule } from '../artifact.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('ArtifactsAllTableComponent', () => {
  let component: ArtifactsAllTableComponent;
  let fixture: ComponentFixture<ArtifactsAllTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtifactsAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
