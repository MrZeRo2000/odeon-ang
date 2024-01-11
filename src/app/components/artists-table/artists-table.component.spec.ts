import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsTableComponent } from './artists-table.component';
import {ServiceModule} from "../../service/service.module";
import {DataSourceModule} from "../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoadingComponent} from "../../core/components/loading/loading.component";
import {ConfirmDialogComponent} from "../../core/components/confirm-dialog/confirm-dialog.component";

describe('ArtistsTableComponent', () => {
  let component: ArtistsTableComponent;
  let fixture: ComponentFixture<ArtistsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        ArtistsTableComponent
      ],
      providers: [ConfirmationService, MessageService],
      imports: [DataSourceModule, ServiceModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
