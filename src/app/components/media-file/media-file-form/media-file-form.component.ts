import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {MediaFile} from "../../../model/media-file";
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {MediaFileService} from "../../../service/media-file.service";

@Component({
  selector: 'app-media-file-form',
  templateUrl: './media-file-form.component.html',
  styleUrls: ['./media-file-form.component.scss']
})
export class MediaFileFormComponent extends BaseCrudFormComponent<MediaFile> implements OnChanges {

  @Input()
  isVideo: boolean = false;

  editForm: FormGroup = this.fb.group({});

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
        console.log(`changed media file ${JSON.stringify(mediaFileProp.currentValue)}, isVideo=${this.isVideo}`);

        this.editForm = this.fb.group({
          name: [mediaFileProp.currentValue.name?? '', Validators.required],
          format: [mediaFileProp.currentValue.format?? '', Validators.required],
          size: [mediaFileProp.currentValue.size?? '', Validators.required],
          bitrate: [mediaFileProp.currentValue.bitrate?? '', Validators.required],
          duration: [mediaFileProp.currentValue.duration?? '', Validators.required],
          width: [mediaFileProp.currentValue.width?? '', this.isVideo ? Validators.required : Validators.nullValidator],
          height: [mediaFileProp.currentValue.height?? '', this.isVideo ? Validators.required : Validators.nullValidator],
          extra: [mediaFileProp.currentValue.extra?? ''],
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
      duration: this.editForm.value.duration,
      width: this.editForm.value.width?? null,
      height: this.editForm.value.height?? null,
      extra: this.editForm.value.extra?? null,
    } as MediaFile
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

}
