import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoComponent } from './app-info.component';
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ToastModule} from "primeng/toast";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {MessageService} from "primeng/api";

describe('AppInfoComponent', () => {
  let component: AppInfoComponent;
  let fixture: ComponentFixture<AppInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSourceModule, ToastModule, TagModule, TooltipModule],
      providers: [MessageService],
      declarations: [ AppInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
