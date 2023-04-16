import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductFormComponent } from './dvproduct-form.component';

describe('DVProductFormComponent', () => {
  let component: DVProductFormComponent;
  let fixture: ComponentFixture<DVProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DVProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
