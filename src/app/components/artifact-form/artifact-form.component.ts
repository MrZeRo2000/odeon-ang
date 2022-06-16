import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtifactEditItem, ARTIFACT_TYPES} from "../../model/artifacts";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-artifact-form',
  templateUrl: './artifact-form.component.html',
  styleUrls: ['./artifact-form.component.scss']
})
export class ArtifactFormComponent implements OnInit, OnChanges {
  readonly ARTIFACT_TYPES = ARTIFACT_TYPES;

  @Input()
  display: boolean = false;
  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  @Input()
  artifact: ArtifactEditItem = {} as ArtifactEditItem;

  @Output()
  savedArtifactEvent: EventEmitter<ArtifactEditItem> = new EventEmitter();

  submitted = false;

  editForm = this.fb.group({
    artifactTypeId: ['', Validators.required],
    artistId: ['', Validators.required],
    title: ['', Validators.required],
    year: [''],
    duration: [''],
    size: ['']
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'artifact') {
        const changedProp = changes[propName];
        console.log(`changed artifact ${JSON.stringify(changedProp.currentValue)}`);
        this.editForm.setValue({
          "artifactTypeId": changedProp.currentValue.artifactTypeId?? ARTIFACT_TYPES[0].code,
          "artistId": changedProp.currentValue.artistId?? '',
          "title": changedProp.currentValue.title?? '',
          "year": changedProp.currentValue.year?? '',
          "duration": changedProp.currentValue.duration?? '',
          "size": changedProp.currentValue.size?? '',
        })
      }
    }
  }

  hideDialog(): void {
    this.submitted = false;
    this.displayProp = false;
  }

  saveArtist(): void {
    this.submitted = true;
  }

}
