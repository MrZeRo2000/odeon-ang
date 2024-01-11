import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFileFormComponent } from './media-file-form.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";

describe('MediaFileFormComponent', () => {
  let component: MediaFileFormComponent;
  let fixture: ComponentFixture<MediaFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //standard
        HttpClientTestingModule,
        RouterTestingModule,
        //library
        DialogModule,
        //custom
        DataSourceModule,
      ],
      providers: [
        //library
        ConfirmationService,
        MessageService,
      ],
      declarations: [ MediaFileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
