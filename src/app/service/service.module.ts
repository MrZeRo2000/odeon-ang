import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcessService} from "./process.service";
import {ArtistService} from "./artist.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProcessService,
    ArtistService
  ]
})
export class ServiceModule { }
