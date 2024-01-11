import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppInfoComponent } from './components/app-info/app-info.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProcessingComponent } from './components/processing/processing.component';

import {MenubarModule} from "primeng/menubar";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TreeModule} from "primeng/tree";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ServiceModule} from "./service/service.module";
import {DataSourceModule} from "./data-source/data-source.module";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {MessagesModule} from "primeng/messages";
import { BaseComponent } from './components/base/base.component';
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";
import {BadgeModule} from "primeng/badge";
import { ProcessingStatusIndicatorComponent } from './components/processing-status-indicator/processing-status-indicator.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ProgressBarModule} from "primeng/progressbar";
import {ChipModule} from "primeng/chip";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AutoCompleteModule} from "primeng/autocomplete";
import {SelectButtonModule} from "primeng/selectbutton";
import {DecimalPipe} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";

import {SliderModule} from "primeng/slider";
import { DatabaseBackupComponent } from './components/database-backup/database-backup.component';
import {TabViewModule} from "primeng/tabview";
import {KeyFilterModule} from "primeng/keyfilter";
import {ListboxModule} from "primeng/listbox";
import {UserImportModule} from "./components/user-import/user-import.module";
import {ArtifactModule} from "./components/artifact/artifact.module";
import {CoreModule} from "./core/core.module";
import {ArtistModule} from "./components/artist/artist.module";
import {DvModule} from "./components/dv/dv.module";
import {MediaFileModule} from "./components/media-file/media-file.module";
import {TrackModule} from "./components/track/track.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppInfoComponent,
    LandingComponent,
    ProcessingComponent,
    BaseComponent,
    ProcessingStatusIndicatorComponent,
    DatabaseBackupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MenubarModule,
    SharedModule,
    TreeModule,
    ConfirmDialogModule,
    ToastModule,
    MessageModule,
    DataSourceModule,
    ServiceModule,
    MessagesModule,
    TableModule,
    PanelModule,
    BadgeModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    ChipModule,
    TagModule,
    InputTextModule,
    RippleModule,
    DialogModule,
    InputTextareaModule,
    AutoCompleteModule,
    ConfirmPopupModule,
    SelectButtonModule,
    InputNumberModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    SliderModule,
    TabViewModule,
    KeyFilterModule,
    ListboxModule,
    // custom modules
    CoreModule,
    UserImportModule,
    ArtifactModule,
    ArtistModule,
    DvModule,
    MediaFileModule,
    TrackModule,
  ],
  providers: [MessageService, ConfirmationService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
