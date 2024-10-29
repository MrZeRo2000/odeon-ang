import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksTableComponent } from './tracks-table.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DecimalPipe} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TracksTableComponent', () => {
  let component: TracksTableComponent;
  let fixture: ComponentFixture<TracksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        TracksTableComponent
    ],
    imports: [RouterTestingModule,
        //custom
        DataSourceModule],
    providers: [
        DecimalPipe,
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
