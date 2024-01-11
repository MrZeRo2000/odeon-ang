import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsVideoTableComponent } from './artifacts-video-table.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoadingComponent} from "../../../core/components/loading/loading.component";

describe('ArtifactsVideoTableComponent', () => {
  let component: ArtifactsVideoTableComponent;
  let fixture: ComponentFixture<ArtifactsVideoTableComponent>;

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
        ArtifactsVideoTableComponent
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
