import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsAllTableComponent } from './artifacts-all-table.component';
import {ArtifactModule} from "../artifact.module";
import {RouterModule} from "@angular/router";
import {MessageService} from "primeng/api";
import {REST_URL_ENV} from "../../../data-source/rest-data-source.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('ArtifactsAllTableComponent', () => {
  let component: ArtifactsAllTableComponent;
  let fixture: ComponentFixture<ArtifactsAllTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtifactsAllTableComponent],
      imports: [
        RouterModule. forRoot(
          [{path: '', component: ArtifactsAllTableComponent}, {path: 'simple', component: ArtifactsAllTableComponent}]
        ),
        ArtifactModule
      ],
      providers: [
        MessageService,
        REST_URL_ENV,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactsAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
