import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistFormComponent } from './artist-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {ServiceModule} from "../../../service/service.module";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {DialogModule} from "primeng/dialog";
import {ConfirmPopupModule} from "primeng/confirmpopup";

describe('ArtistFormComponent', () => {
  let component: ArtistFormComponent;
  let fixture: ComponentFixture<ArtistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistFormComponent ],
      providers: [ConfirmationService, MessageService],
      imports: [
        //standard
        ReactiveFormsModule,
        //library
        DialogModule,
        ConfirmPopupModule,
        //custom
        DataSourceModule,
        ServiceModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
