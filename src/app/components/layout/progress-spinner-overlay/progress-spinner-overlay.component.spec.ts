import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSpinnerOverlayComponent } from './progress-spinner-overlay.component';
import {LayoutModule} from "../layout.module";

describe('ProgressSpinnerOverlayComponent', () => {
  let component: ProgressSpinnerOverlayComponent;
  let fixture: ComponentFixture<ProgressSpinnerOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressSpinnerOverlayComponent],
      imports: [LayoutModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressSpinnerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
