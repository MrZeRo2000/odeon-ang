import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArtistFormComponent} from "./artist-form/artist-form.component";
import {ArtistsTableComponent} from "./artists-table/artists-table.component";
import {ArtistLyricsFormComponent} from "./artist-lyrics-form/artist-lyrics-form.component";
import {ArtistLyricsTableComponent} from "./artist-lyrics-table/artist-lyrics-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";
import {ChipModule} from "primeng/chip";
import {TagModule} from "primeng/tag";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ChipsModule} from "primeng/chips";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    ArtistFormComponent,
    ArtistsTableComponent,
    ArtistLyricsFormComponent,
    ArtistLyricsTableComponent,
  ],
  exports: [
    ArtistFormComponent,
    ArtistsTableComponent,
    ArtistLyricsFormComponent,
    ArtistLyricsTableComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // primeng
    ChipModule,
    ChipsModule,
    InputTextareaModule,
    RippleModule,
    TagModule,
    ButtonModule,
    DialogModule,
    TableModule,
    SelectButtonModule,
    AutoCompleteModule,
    MultiSelectModule,
    ConfirmPopupModule,
    // custom modules
    CoreModule,
  ]
})
export class ArtistModule { }
