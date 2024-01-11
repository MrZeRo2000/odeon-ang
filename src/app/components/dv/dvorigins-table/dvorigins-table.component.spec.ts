import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVOriginsTableComponent } from './dvorigins-table.component';

describe('DVOriginsTableComponent', () => {
  let component: DVOriginsTableComponent;
  let fixture: ComponentFixture<DVOriginsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DVOriginsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVOriginsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
