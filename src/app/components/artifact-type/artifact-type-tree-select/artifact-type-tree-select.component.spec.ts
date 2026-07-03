import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ArtifactTypeTreeSelectComponent } from './artifact-type-tree-select.component';
import { ArtifactTypeModule } from '../artifact-type.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('ArtifactTypeTreeSelectComponent', () => {
  let component: ArtifactTypeTreeSelectComponent;
  let fixture: ComponentFixture<ArtifactTypeTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactTypeModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtifactTypeTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
