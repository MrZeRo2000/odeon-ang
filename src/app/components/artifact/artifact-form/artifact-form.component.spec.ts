import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactFormComponent } from './artifact-form.component';
import {ConfirmationService, MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtifactFormComponent', () => {
  let component: ArtifactFormComponent;
  let fixture: ComponentFixture<ArtifactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        ArtifactFormComponent
    ],
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
    fixture = TestBed.createComponent(ArtifactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
