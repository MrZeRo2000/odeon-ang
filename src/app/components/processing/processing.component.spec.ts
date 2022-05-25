import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingComponent } from './processing.component';
import {TreeModule} from "primeng/tree";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessageService} from "primeng/api";
import {DataSourceModule} from "../../data-source/data-source.module";
import {ToastModule} from "primeng/toast";

describe('ProcessingComponent', () => {
  let component: ProcessingComponent;
  let fixture: ComponentFixture<ProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingComponent ],
      imports: [
        TreeModule,
        ConfirmDialogModule,
        ToastModule,
        DataSourceModule
      ],
      providers: [
        MessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
