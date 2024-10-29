import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFilesTableComponent } from './media-files-table.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConfirmationService, MessageService} from "primeng/api";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MediaFilesTableComponent', () => {
  let component: MediaFilesTableComponent;
  let fixture: ComponentFixture<MediaFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        MediaFilesTableComponent
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
