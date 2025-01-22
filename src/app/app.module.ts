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
import Aura from '@primeng/themes/aura';


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
  ],
  bootstrap: [AppComponent],
  providers: [
    MessageService,
    ConfirmationService,
    DecimalPipe,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
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
