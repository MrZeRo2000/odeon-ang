import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedFormComponent } from './tagged-form.component';
import {TrackFormComponent} from "../../track/track-form/track-form.component";
import {DialogModule} from "primeng/dialog";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ServiceModule} from "../../../service/service.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('TaggedFormComponent', () => {
  let component: TaggedFormComponent;
  let fixture: ComponentFixture<TaggedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackFormComponent],
      imports: [
        //library
        DialogModule,
        //custom
        DataSourceModule,
        ServiceModule],
      providers: [
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
