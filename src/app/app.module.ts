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
import { ProcessingStatusNamePipe } from './pipes/processing-status-name.pipe';
import { ProcessorTypeNamePipe } from './pipes/processor-type-name.pipe';
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";
import {BadgeModule} from "primeng/badge";
import { ProcessingStatusIndicatorComponent } from './components/processing-status-indicator/processing-status-indicator.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ProgressBarModule} from "primeng/progressbar";
import { ArtistsTableComponent } from './components/artists-table/artists-table.component';
import { LoadingComponent } from './components/loading/loading.component';
import {ChipModule} from "primeng/chip";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AutoCompleteModule} from "primeng/autocomplete";
import { BiographyFormComponent } from './components/biography-form/biography-form.component';
import {SelectButtonModule} from "primeng/selectbutton";
import { ArtifactsTableComponent } from './components/artifacts-table/artifacts-table.component';
import { FileSizePipe } from './pipes/file-size-pipe.pipe';
import { CrudPanelComponent } from './components/crud-panel/crud-panel.component';
import { ArtifactFormComponent } from './components/artifact-form/artifact-form.component';
import { TracksTableComponent } from './components/tracks-table/tracks-table.component';
import {DecimalPipe} from "@angular/common";
import { TrackFormComponent } from './components/track-form/track-form.component';
import { BaseTableComponent } from './components/base/base-table.component';
import {InputNumberModule} from "primeng/inputnumber";
import {BaseFormComponent} from "./components/base/base-form.component";
import { MediaFilesTableComponent } from './components/media-files-table/media-files-table.component';
import { MediaFileFormComponent } from './components/media-file-form/media-file-form.component';
import {MultiSelectModule} from "primeng/multiselect";
import { ArtistLyricsTableComponent } from './components/artist-lyrics-table/artist-lyrics-table.component';
import { LyricsTextFormComponent } from './components/lyrics-text-form/lyrics-text-form.component';
import { ArtistLyricsFormComponent } from './components/artist-lyrics-form/artist-lyrics-form.component';
import { ArtifactsVideoTableComponent } from './components/artifacts-video-table/artifacts-video-table.component';
import {DropdownModule} from "primeng/dropdown";
import { ArtifactCaptionPipe } from './pipes/artifact-caption.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppInfoComponent,
    LandingComponent,
    ProcessingComponent,
    BaseComponent,
    ProcessingStatusNamePipe,
    ProcessorTypeNamePipe,
    ProcessingStatusIndicatorComponent,
    ArtistsTableComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    ArtistFormComponent,
    BiographyFormComponent,
    ArtifactsTableComponent,
    FileSizePipe,
    CrudPanelComponent,
    ArtifactFormComponent,
    TracksTableComponent,
    TrackFormComponent,
    MediaFilesTableComponent,
    MediaFileFormComponent,
    ArtistLyricsTableComponent,
    LyricsTextFormComponent,
    ArtistLyricsFormComponent,
    ArtifactsVideoTableComponent,
    ArtifactCaptionPipe
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
        DropdownModule
    ],
  providers: [MessageService, ConfirmationService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
