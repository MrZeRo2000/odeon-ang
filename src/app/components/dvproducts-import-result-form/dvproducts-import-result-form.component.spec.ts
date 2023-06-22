import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVProductsImportResultFormComponent } from './dvproducts-import-result-form.component';

describe('DVProductsImportResultFormComponent', () => {
  let component: DVProductsImportResultFormComponent;
  let fixture: ComponentFixture<DVProductsImportResultFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DVProductsImportResultFormComponent]
    });
    fixture = TestBed.createComponent(DVProductsImportResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
