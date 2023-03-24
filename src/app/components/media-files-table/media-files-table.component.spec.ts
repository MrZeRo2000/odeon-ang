import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFilesTableComponent } from './media-files-table.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConfirmationService, MessageService} from "primeng/api";
import {DataSourceModule} from "../../data-source/data-source.module";
import {LoadingComponent} from "../loading/loading.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

describe('MediaFilesTableComponent', () => {
  let component: MediaFilesTableComponent;
  let fixture: ComponentFixture<MediaFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //standard
        HttpClientTestingModule,
        RouterTestingModule,
        //custom
        DataSourceModule,
      ],
      providers: [
        //library
        ConfirmationService,
        MessageService,
      ],
      declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        MediaFilesTableComponent
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
