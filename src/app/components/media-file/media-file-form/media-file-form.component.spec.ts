import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFileFormComponent } from './media-file-form.component';
import {ConfirmationService, MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";
import {FormControl} from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MediaFileFormComponent', () => {
  let component: MediaFileFormComponent;
  let fixture: ComponentFixture<MediaFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MediaFileFormComponent],
    imports: [RouterTestingModule,
        //library
        DialogModule,
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
    fixture = TestBed.createComponent(MediaFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('parse object ok', () => {
    const value = '{"extra": ["00:44:33"]}'
    const formControl = new FormControl(value)
    expect(component.createExtraValidator()(formControl)).toBeNull();
  })

  it('parse object with slash should be ok', () => {
    const value = '{"extra": [\"00:44:33\", \"01:12:55\"]}'
    const formControl = new FormControl(value)
    expect(component.createExtraValidator()(formControl)).toBeNull();
  })

  it('parse object not json should fail', () => {
    const value = '"extra": [\"00:44:33\", \"01:12:55\"]}'
    const formControl = new FormControl(value)
    expect(component.createExtraValidator()(formControl)).toEqual({extra: "Error parsing extra value"})
  })

  it('parse object no extra should fail', () => {
    const value = '{"ddd": [\"00:44:33\", \"01:12:55\"]}'
    const formControl = new FormControl(value)
    expect(component.createExtraValidator()(formControl)).toEqual({extra: "Extra value not found"})
  })

  it('parse object no time should fail', () => {
    const value = '{"extra": [\"00:44:86\", \"01:12:55\"]}'
    const formControl = new FormControl(value)
    expect(component.createExtraValidator()(formControl)).toEqual({extra: "Error parsing element (date) 00:44:86"})
  })
});
