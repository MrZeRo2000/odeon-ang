import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DVProductsTableComponent } from './dvproducts-table.component';
import { DVModule } from '../d-v.module';
import { DataSourceModule } from '../../../data-source/data-source.module';

describe('DVProductsTableComponent', () => {
  let component: DVProductsTableComponent;
  let fixture: ComponentFixture<DVProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DVModule, RouterTestingModule, DataSourceModule],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DVProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
