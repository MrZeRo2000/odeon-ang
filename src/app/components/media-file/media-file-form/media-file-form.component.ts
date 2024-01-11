import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {MediaFile} from "../../../model/media-file";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {MediaFileService} from "../../../service/media-file.service";

@Component({
  selector: 'app-media-file-form',
  templateUrl: './media-file-form.component.html',
  styleUrls: ['./media-file-form.component.scss']
})
export class MediaFileFormComponent extends BaseCrudFormComponent<MediaFile> implements OnChanges {

  editForm = this.fb.group({
    name: ['', Validators.required],
    format: ['', Validators.required],
    size: ['', Validators.required],
    bitrate: ['', Validators.required],
    duration: ['', Validators.required],
  })

  constructor(
    private fb: UntypedFormBuilder,
    override messageService: MessageService,
    protected mediaFileService: MediaFileService,
  ) {
    super(messageService, mediaFileService)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const mediaFileProp = changes[propName];
        console.log(`changed media file ${JSON.stringify(mediaFileProp.currentValue)}`);
        this.editForm.setValue({
          "name": mediaFileProp.currentValue.name?? '',
          "format": mediaFileProp.currentValue.format?? '',
          "size": mediaFileProp.currentValue.size?? '',
          "bitrate": mediaFileProp.currentValue.bitrate?? '',
          "duration": mediaFileProp.currentValue.duration?? '',
        })
      }
    }
  }

  override createSavedItem(): MediaFile {
    return {
      id: this.editItem?.id,
      artifactId: this.editItem?.artifactId,
      name: this.editForm.value.name,
      format: this.editForm.value.format,
      size: this.editForm.value.size,
      bitrate: this.editForm.value.bitrate,
      duration: this.editForm.value.duration
    } as MediaFile
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

}
