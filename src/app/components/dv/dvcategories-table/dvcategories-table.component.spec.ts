import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVCategoriesTableComponent } from './dvcategories-table.component';

describe('DVCategoryTableComponent', () => {
  let component: DVCategoriesTableComponent;
  let fixture: ComponentFixture<DVCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DVCategoriesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
