import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionFormComponent } from './composition-form.component';

describe('CompositionFormComponent', () => {
  let component: CompositionFormComponent;
  let fixture: ComponentFixture<CompositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
