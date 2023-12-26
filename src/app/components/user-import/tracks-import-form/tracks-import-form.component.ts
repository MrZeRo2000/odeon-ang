import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {MediaFile} from "../../../model/media-file";
import {DV_TYPES, DVType} from "../../../model/dvtype";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserImportService} from "../../../service/user-import.service";
import {Artifact} from "../../../model/artifacts";

@Component({
  selector: 'app-tracks-import-form',
  templateUrl: './tracks-import-form.component.html',
  styleUrls: ['./tracks-import-form.component.scss']
})
export class TracksImportFormComponent extends BaseFormComponent implements OnInit {
  DV_TYPES = DV_TYPES;

  @Input()
  public artifact?: Artifact;

  @Input()
  public mediaFiles: Array<MediaFile> = []

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  editForm: FormGroup = this.fb.group({
    mediaFile: ['', Validators.required],
    dvType: [8, Validators.required],
    num: [''],
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
  }

  executeImport(): void {

  }
}
