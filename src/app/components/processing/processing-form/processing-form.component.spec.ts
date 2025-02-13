import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingFormComponent } from './processing-form.component';
import {TreeModule} from "primeng/tree";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessageService} from "primeng/api";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import {CoreModule} from "../../../core/core.module";

describe('ProcessingComponent', () => {
  let component: ProcessingFormComponent;
  let fixture: ComponentFixture<ProcessingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent,
        ProcessingFormComponent
      ],
      imports: [
        TreeModule,
        ConfirmDialogModule,
        ToastModule,
        DataSourceModule,
        CoreModule,
      ],
      providers: [
        MessageService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
