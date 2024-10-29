import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsVideoTableComponent } from './artifacts-video-table.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtifactsVideoTableComponent', () => {
  let component: ArtifactsVideoTableComponent;
  let fixture: ComponentFixture<ArtifactsVideoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        ArtifactsVideoTableComponent
    ],
    imports: [RouterTestingModule,
        //custom
        DataSourceModule],
    providers: [
        //library
        ConfirmationService,
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactsVideoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
