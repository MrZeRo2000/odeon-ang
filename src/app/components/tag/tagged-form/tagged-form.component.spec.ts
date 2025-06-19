import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedFormComponent } from './tagged-form.component';

describe('TaggedFormComponent', () => {
  let component: TaggedFormComponent;
  let fixture: ComponentFixture<TaggedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
