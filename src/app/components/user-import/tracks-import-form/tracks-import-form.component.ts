import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {MediaFile} from "../../../model/media-file";
import {DV_TYPES, DVType} from "../../../model/dvtype";

@Component({
  selector: 'app-tracks-import-form',
  templateUrl: './tracks-import-form.component.html',
  styleUrls: ['./tracks-import-form.component.scss']
})
export class TracksImportFormComponent extends BaseFormComponent {
  DV_TYPES = DV_TYPES;

  @Input()
  public mediaFiles: Array<MediaFile> = []

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  executeImport(): void {

  }
}
