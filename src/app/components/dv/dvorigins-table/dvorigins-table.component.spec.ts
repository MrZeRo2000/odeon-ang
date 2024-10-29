import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVOriginsTableComponent } from './dvorigins-table.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {DataSourceModule} from "../../../data-source/data-source.module";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DVOriginsTableComponent', () => {
  let component: DVOriginsTableComponent;
  let fixture: ComponentFixture<DVOriginsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        DVOriginsTableComponent
    ],
    imports: [
        // custom
        DataSourceModule],
    providers: [
        // primeng
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(DVOriginsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
