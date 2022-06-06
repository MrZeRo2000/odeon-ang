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
    LoadingComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
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
        DialogModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
