import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyFormComponent } from './biography-form.component';
import {DialogModule} from "primeng/dialog";

describe('BiographyFormComponent', () => {
  let component: BiographyFormComponent;
  let fixture: ComponentFixture<BiographyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogModule
      ],
      declarations: [ BiographyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiographyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
