import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DVCategoryFormComponent } from './dvcategory-form.component';

describe('DVCategoryFormComponent', () => {
  let component: DVCategoryFormComponent;
  let fixture: ComponentFixture<DVCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DVCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DVCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
