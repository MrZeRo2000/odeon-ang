import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVCategoryFormComponent } from './dvcategory-form.component';
import {MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DVCategoryFormComponent', () => {
  let component: DVCategoryFormComponent;
  let fixture: ComponentFixture<DVCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        DVCategoryFormComponent
    ],
    imports: [
        // primeng
        DialogModule,
        // custom
        DataSourceModule],
    providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(DVCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
