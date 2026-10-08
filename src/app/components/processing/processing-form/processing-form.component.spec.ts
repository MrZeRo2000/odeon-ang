import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingFormComponent } from './processing-form.component';
import {MessageService} from "primeng/api";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ProcessingModule} from "../processing.module";

describe('ProcessingComponent', () => {
  let component: ProcessingFormComponent;
  let fixture: ComponentFixture<ProcessingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // declares ProcessingFormComponent together with everything its template uses
        ProcessingModule,
        DataSourceModule,
      ],
      providers: [
        MessageService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
