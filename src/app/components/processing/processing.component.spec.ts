import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingComponent } from './processing.component';
import {TreeModule} from "primeng/tree";
import {ConfirmDialogModule} from "primeng/confirmdialog";

describe('ProcessingComponent', () => {
  let component: ProcessingComponent;
  let fixture: ComponentFixture<ProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingComponent ],
      imports: [
        TreeModule,
        ConfirmDialogModule
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
