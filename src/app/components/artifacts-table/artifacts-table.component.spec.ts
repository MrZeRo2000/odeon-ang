import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsTableComponent } from './artifacts-table.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoadingComponent} from "../loading/loading.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

describe('ArtifactsTableComponent', () => {
  let component: ArtifactsTableComponent;
  let fixture: ComponentFixture<ArtifactsTableComponent>;

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
        ArtifactsTableComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
