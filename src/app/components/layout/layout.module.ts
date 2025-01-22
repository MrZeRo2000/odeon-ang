import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {AppInfoComponent} from "./app-info/app-info.component";
import {LandingComponent} from "./landing/landing.component";
import {DatabaseBackupComponent} from "./database-backup/database-backup.component";
import {MenubarModule} from "primeng/menubar";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {DataSourceModule} from "../../data-source/data-source.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ProgressSpinnerOverlayComponent} from "./progress-spinner-overlay/progress-spinner-overlay.component";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    HeaderComponent,
    AppInfoComponent,
    LandingComponent,
    ProgressSpinnerOverlayComponent,
    DatabaseBackupComponent,
  ],
  exports: [
    HeaderComponent,
    AppInfoComponent,
    LandingComponent,
    ProgressSpinnerOverlayComponent,
    DatabaseBackupComponent,
  ],
  imports: [
    CommonModule,
    // primeng
    MenubarModule,
    TagModule,
    ButtonModule,
    ProgressSpinnerModule,
    TooltipModule,
    // custom
    DataSourceModule,
  ],
})
export class LayoutModule { }
