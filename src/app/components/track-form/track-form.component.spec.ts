import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFormComponent } from './track-form.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../data-source/data-source.module";
import {ServiceModule} from "../../service/service.module";
import {MessageService} from "primeng/api";
import {RouterTestingModule} from "@angular/router/testing";
import {DialogModule} from "primeng/dialog";

describe('TrackFormComponent', () => {
  let component: TrackFormComponent;
  let fixture: ComponentFixture<TrackFormComponent>;

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
        ServiceModule,
        ],
      providers: [
        MessageService,
      ],
      declarations: [ TrackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
