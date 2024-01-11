import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoComponent } from './app-info.component';
import {DataSourceModule} from "../../../data-source/data-source.module";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

describe('AppInfoComponent', () => {
  let component: AppInfoComponent;
  let fixture: ComponentFixture<AppInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSourceModule, MessagesModule, ToastModule],
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
