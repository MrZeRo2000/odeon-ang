import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLyricsFormComponent } from './artist-lyrics-form.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtistLyricsFormComponent', () => {
  let component: ArtistLyricsFormComponent;
  let fixture: ComponentFixture<ArtistLyricsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ArtistLyricsFormComponent],
    imports: [RouterTestingModule,
        //library
        DialogModule,
        ConfirmDialogModule,
        //custom
        DataSourceModule],
    providers: [
        //library
        ConfirmationService,
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
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
