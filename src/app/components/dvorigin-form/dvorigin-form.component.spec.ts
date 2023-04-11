import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVOriginFormComponent } from './dvorigin-form.component';

describe('DVOriginFormComponent', () => {
  let component: DVOriginFormComponent;
  let fixture: ComponentFixture<DVOriginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DVOriginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVOriginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
