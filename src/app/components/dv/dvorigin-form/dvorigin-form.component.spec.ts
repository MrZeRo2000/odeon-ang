import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVOriginFormComponent } from './dvorigin-form.component';
import {MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DVOriginFormComponent', () => {
  let component: DVOriginFormComponent;
  let fixture: ComponentFixture<DVOriginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        DVOriginFormComponent
    ],
    imports: [
        // primeng
        DialogModule,
        ConfirmDialogModule,
        // custom
        DataSourceModule],
    providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(DVOriginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
