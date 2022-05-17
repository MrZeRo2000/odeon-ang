import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import { AppInfoComponent } from './components/app-info/app-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
