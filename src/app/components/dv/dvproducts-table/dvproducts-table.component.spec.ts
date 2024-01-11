import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductsTableComponent } from './dvproducts-table.component';

describe('DVProductsTableComponent', () => {
  let component: DVProductsTableComponent;
  let fixture: ComponentFixture<DVProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DVProductsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
