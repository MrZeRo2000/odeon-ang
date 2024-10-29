import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLyricsTableComponent } from './artist-lyrics-table.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DataSourceModule} from "../../../data-source/data-source.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoadingComponent} from "../../../core/components/loading/loading.component";
import {CoreModule} from "../../../core/core.module";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtistLyricsTableComponent', () => {
  let component: ArtistLyricsTableComponent;
  let fixture: ComponentFixture<ArtistLyricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        LoadingComponent,
        ArtistLyricsTableComponent
    ],
    imports: [RouterTestingModule,
        //custom
        DataSourceModule,
        CoreModule],
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
    fixture = TestBed.createComponent(ArtistLyricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
