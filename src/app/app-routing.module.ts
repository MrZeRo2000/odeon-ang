import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/layout/landing/landing.component";
import {ProcessingFormComponent} from "./components/processing/processing-form/processing-form.component";
import {ArtistsTableComponent} from "./components/artist/artists-table/artists-table.component";
import {ArtifactsTableComponent} from "./components/artifact/artifacts-table/artifacts-table.component";
import {TracksTableComponent} from "./components/track/tracks-table/tracks-table.component";
import {MediaFilesTableComponent} from "./components/media-file/media-files-table/media-files-table.component";
import {ArtistLyricsTableComponent} from "./components/artist/artist-lyrics-table/artist-lyrics-table.component";
import {ArtifactsVideoTableComponent} from "./components/artifact/artifacts-video-table/artifacts-video-table.component";
import {DVOriginsTableComponent} from "./components/dv/dvorigins-table/dvorigins-table.component";
import {DVCategoriesTableComponent} from "./components/dv/dvcategories-table/dvcategories-table.component";
import {DVProductsTableComponent} from "./components/dv/dvproducts-table/dvproducts-table.component";
import {ArtifactsAllTableComponent} from "./components/artifact/artifacts-all-table/artifacts-all-table.component";

const routes: Routes = [
  {path: '', component: LandingComponent, pathMatch: 'full'},
  {path: 'processing', component: ProcessingFormComponent, pathMatch: 'full'},
  {path: 'artists', component: ArtistsTableComponent, pathMatch: 'full'},
  {path: 'lyrics', component: ArtistLyricsTableComponent, pathMatch: 'full'},
  {path: 'lyrics/:id', component: ArtistLyricsTableComponent, pathMatch: 'full'},
  {path: 'artifacts', component: ArtifactsTableComponent, pathMatch: 'full'},
  {path: 'artifacts-video', component: ArtifactsVideoTableComponent, pathMatch: 'full'},
  {path: 'artifacts-all', component: ArtifactsAllTableComponent, pathMatch: 'full'},
  {path: 'tracks', component: TracksTableComponent, pathMatch: 'prefix'},
  {path: 'tracks/:id', component: TracksTableComponent, pathMatch: 'prefix'},
  {path: 'media-files/:id', component: MediaFilesTableComponent, pathMatch: 'prefix'},
  {path: 'dvorigins', component: DVOriginsTableComponent, pathMatch: 'full'},
  {path: 'dvcategories', component: DVCategoriesTableComponent, pathMatch: 'full'},
  {path: 'dvproducts', component: DVProductsTableComponent, pathMatch: 'full'},
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
