import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewDialogComponent } from './text-view-dialog.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";

describe('TextViewDialogComponent', () => {
  let component: TextViewDialogComponent;
  let fixture: ComponentFixture<TextViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextViewDialogComponent
      ],
      imports: [
        // primeng
        DialogModule,
        ConfirmDialogModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
