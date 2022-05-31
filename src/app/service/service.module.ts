import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppService} from "./app.service";
import {ProcessService} from "./process.service";
import {ArtistService} from "./artist.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppService,
    ProcessService,
    ArtistService
  ]
})
export class ServiceModule { }
