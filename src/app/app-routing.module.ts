import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {ProcessingComponent} from "./components/processing/processing.component";
import {ArtistsTableComponent} from "./components/artists-table/artists-table.component";

const routes: Routes = [
  {path: '', component: LandingComponent, pathMatch: 'full'},
  {path: 'processing', component: ProcessingComponent, pathMatch: 'full'},
  {path: 'artists', component: ArtistsTableComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
