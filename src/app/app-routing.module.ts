import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {ProcessingComponent} from "./components/processing/processing.component";
import {ArtistsTableComponent} from "./components/artists-table/artists-table.component";
import {ArtifactsTableComponent} from "./components/artifacts-table/artifacts-table.component";
import {TracksTableComponent} from "./components/tracks-table/tracks-table.component";
import {MediaFilesTableComponent} from "./components/media-files-table/media-files-table.component";
import {ArtistLyricsTableComponent} from "./components/artist-lyrics-table/artist-lyrics-table.component";
import {ArtifactsVideoTableComponent} from "./components/artifacts-video-table/artifacts-video-table.component";

const routes: Routes = [
  {path: '', component: LandingComponent, pathMatch: 'full'},
  {path: 'processing', component: ProcessingComponent, pathMatch: 'full'},
  {path: 'artists', component: ArtistsTableComponent, pathMatch: 'full'},
  {path: 'lyrics', component: ArtistLyricsTableComponent, pathMatch: 'full'},
  {path: 'lyrics/:id', component: ArtistLyricsTableComponent, pathMatch: 'full'},
  {path: 'artifacts', component: ArtifactsTableComponent, pathMatch: 'full'},
  {path: 'artifacts-video', component: ArtifactsVideoTableComponent, pathMatch: 'full'},
  {path: 'tracks/:id', component: TracksTableComponent, pathMatch: 'prefix'},
  {path: 'media-files/:id', component: MediaFilesTableComponent, pathMatch: 'prefix'},
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
