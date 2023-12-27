import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {MediaFile} from "../../../model/media-file";
import {DV_TYPES, DVType} from "../../../model/dvtype";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserImportService} from "../../../service/user-import.service";
import {Artifact} from "../../../model/artifacts";
import {TrackUserImport} from "../../../model/user-import";

@Component({
  selector: 'app-tracks-import-form',
  templateUrl: './tracks-import-form.component.html',
  styleUrls: ['./tracks-import-form.component.scss']
})
export class TracksImportFormComponent extends BaseFormComponent implements OnInit {
  DV_TYPES = DV_TYPES;
  readonly NUM_OPTIONS = [{'id': 1, 'name': '1'}]

  @Input()
  public artifact?: Artifact;

  @Input()
  public mediaFiles: Array<MediaFile> = []

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  editForm: FormGroup = this.fb.group({
    mediaFile: ['', Validators.required],
    dvType: [8, Validators.required],
    num: ['', Validators.pattern('[1-9][0-9]*$')],
    titles: ['', Validators.required],
    chapters: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userImportService: UserImportService, ) {
    super();
  }

  ngOnInit(): void {
    if (this.mediaFiles && this.mediaFiles.length > 0) {
      this.editForm.patchValue({'mediaFile': this.mediaFiles[0].id})
    }
  }

  private getFormData(): TrackUserImport {
    const titles = this.editForm.value.titles.split('\n').filter((v: any) => !!v);
    const chapters = this.editForm.value.chapters.split('\n').filter((v: any) => !!v);

    console.log(`Form value: ${JSON.stringify(this.editForm.value)}`)

    return {
      artifact: this.artifact as Artifact,
      mediaFile: {id: this.editForm.value.mediaFile} as MediaFile,
      dvType: {id: this.editForm.value.dvType} as DVType,
      titles,
      chapters
    }
  }

  executeImport(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      console.log(`Form data: ${JSON.stringify(this.getFormData())}`)
    } else {
      console.error(`The form is invalid: ${JSON.stringify(this.editForm.errors)}`)
    }
  }
}
