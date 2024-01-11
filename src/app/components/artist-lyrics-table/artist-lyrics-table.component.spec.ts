import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLyricsTableComponent } from './artist-lyrics-table.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoadingComponent} from "../../core/components/loading/loading.component";

describe('ArtistLyricsTableComponent', () => {
  let component: ArtistLyricsTableComponent;
  let fixture: ComponentFixture<ArtistLyricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //standard
        HttpClientTestingModule,
        RouterTestingModule,
        //custom
        DataSourceModule,
      ],
      providers: [
        //library
        ConfirmationService,
        MessageService,
      ],
      declarations: [
        LoadingComponent,
        ArtistLyricsTableComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLyricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
