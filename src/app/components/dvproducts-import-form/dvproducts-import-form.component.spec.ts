import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductsImportFormComponent } from './dvproducts-import-form.component';

describe('DVProductsImportFormComponent', () => {
  let component: DVProductsImportFormComponent;
  let fixture: ComponentFixture<DVProductsImportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DVProductsImportFormComponent]
    });
    fixture = TestBed.createComponent(DVProductsImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
