import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AppInfoComponent} from "../app-info/app-info.component";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {MenubarModule} from "primeng/menubar";
import {RouterTestingModule} from "@angular/router/testing";
import {DatabaseBackupComponent} from "../database-backup/database-backup.component";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        AppInfoComponent,
        DatabaseBackupComponent,
      ],
      imports: [
        RouterTestingModule,
        DataSourceModule,
        MessagesModule,
        ToastModule,
        MenubarModule
      ],
      providers: [MessageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
