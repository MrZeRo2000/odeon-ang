import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLyricsFormComponent } from './artist-lyrics-form.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";

describe('ArtistLyricsFormComponent', () => {
  let component: ArtistLyricsFormComponent;
  let fixture: ComponentFixture<ArtistLyricsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //standard
        HttpClientTestingModule,
        RouterTestingModule,
        //library
        ConfirmDialogModule,
        //custom
        DataSourceModule,
      ],
      providers: [
        //library
        ConfirmationService,
        MessageService,
      ],
      declarations: [ ArtistLyricsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLyricsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
