import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseBackupComponent } from './database-backup.component';
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";

describe('DatabaseBackupComponent', () => {
  let component: DatabaseBackupComponent;
  let fixture: ComponentFixture<DatabaseBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DatabaseBackupComponent
      ],
      providers: [
        MessageService
      ],
      imports: [
        // angular
        HttpClientTestingModule,
        // custom
        DataSourceModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
