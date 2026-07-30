import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {DecimalPipe} from "@angular/common";
import {UserImportModule} from "./components/user-import/user-import.module";
import {ArtifactModule} from "./components/artifact/artifact.module";
import {CoreModule} from "./core/core.module";
import {ArtistModule} from "./components/artist/artist.module";
import {DVModule} from "./components/dv/d-v.module";
import {MediaFileModule} from "./components/media-file/media-file.module";
import {TrackModule} from "./components/track/track.module";
import {ProcessingModule} from "./components/processing/processing.module";
import {LayoutModule} from "./components/layout/layout.module";
import {ToastModule} from "primeng/toast";
import {AppInfoService} from "./components/layout/app-info.service";
import {Observable} from "rxjs";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import {OdeonPreset} from "./primeng.preset";
import {TaggedModule} from "./components/tag/tagged.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // primeng
    ToastModule,
    // custom modules
    CoreModule,
    LayoutModule,
    UserImportModule,
    ArtifactModule,
    ArtistModule,
    DVModule,
    MediaFileModule,
    ProcessingModule,
    TrackModule,
    TaggedModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    MessageService,
    ConfirmationService,
    DecimalPipe,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: OdeonPreset,
      },
      // Free Community license key from https://primeui.dev/licenses/community
      license: 'eyJpZCI6ImQ5ZTVlN2IzLTQ5MGYtNDUzMC04YzA2LTJjZmNjMzk1ZDYyNCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODU0MTU0MDksImV4cCI6MTgxNjk1MTQwOX0.jwDS81qcCx0WbufoXGqgRCup7lpyirRdX_1ebMWg3Slp8ZP0Ts4qp7QocMoY31MgrWkJYSszHOyRvFbxlGKxBQ',
    }),
    provideAppInitializer(() => {
        const initializerFn = (initializeApp)(inject(AppInfoService));
        return initializerFn();
      })
  ],
})
export class AppModule { }


export function initializeApp(appInfoService: AppInfoService): () => Observable<any> {
  return () => appInfoService.getAppInfo()
}
