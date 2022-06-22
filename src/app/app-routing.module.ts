import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {ProcessingComponent} from "./components/processing/processing.component";
import {ArtistsTableComponent} from "./components/artists-table/artists-table.component";
import {ArtifactsTableComponent} from "./components/artifacts-table/artifacts-table.component";
import {CompositionsTableComponent} from "./components/compositions-table/compositions-table.component";

const routes: Routes = [
  {path: '', component: LandingComponent, pathMatch: 'full'},
  {path: 'processing', component: ProcessingComponent, pathMatch: 'full'},
  {path: 'artists', component: ArtistsTableComponent, pathMatch: 'full'},
  {path: 'artifacts', component: ArtifactsTableComponent, pathMatch: 'full'},
  {path: 'compositions/:id', component: CompositionsTableComponent, pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
