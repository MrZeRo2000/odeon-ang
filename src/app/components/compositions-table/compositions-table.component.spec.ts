import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionsTableComponent } from './compositions-table.component';

describe('CompositionsTableComponent', () => {
  let component: CompositionsTableComponent;
  let fixture: ComponentFixture<CompositionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
