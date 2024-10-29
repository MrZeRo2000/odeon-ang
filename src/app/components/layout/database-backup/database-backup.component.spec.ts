import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseBackupComponent } from './database-backup.component';
import {MessageService} from "primeng/api";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DatabaseBackupComponent', () => {
  let component: DatabaseBackupComponent;
  let fixture: ComponentFixture<DatabaseBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        DatabaseBackupComponent
    ],
    imports: [
        // custom
        DataSourceModule],
    providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
