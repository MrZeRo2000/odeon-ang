import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImportResultFormComponent } from './user-import-result-form.component';

describe('DVProductsImportResultFormComponent', () => {
  let component: UserImportResultFormComponent;
  let fixture: ComponentFixture<UserImportResultFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserImportResultFormComponent]
    });
    fixture = TestBed.createComponent(UserImportResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
