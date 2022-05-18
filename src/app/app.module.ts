import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import { AppInfoComponent } from './components/app-info/app-info.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProcessingComponent } from './components/processing/processing.component';
import {TreeModule} from "primeng/tree";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppInfoComponent,
    LandingComponent,
    ProcessingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
