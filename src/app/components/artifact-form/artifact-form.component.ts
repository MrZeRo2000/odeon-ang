import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtifactEditItem, ARTIFACT_TYPES} from "../../model/artifacts";
import {FormBuilder, Validators} from "@angular/forms";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {ArtifactService} from "../../service/artifact.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {IdName} from "../../model/common";

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

  @Input()
  artists: Array<IdName> = [];

  filteredArtists: Array<IdName> = [];

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

  private saveSubject: Subject<ArtifactEditItem> = new Subject<ArtifactEditItem>();

  saveAction$ = this.saveSubject.asObservable().pipe(
    switchMap(data => {
      const action$ = data.id ? this.artifactService.update(data) : this.artifactService.create(data);
      const actionName = data.id ? 'updating' : 'creating';
      return action$.pipe(
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error ${actionName} artifact: ${err.error?.message || err.message}`
          });
          return of(undefined);
        })
      );
    }),
    tap(v => {
      if (!!v) {
        this.savedArtifactEvent.emit(v);
      }
    })
  );

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private artifactService: ArtifactService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'artifact') {
        const artifactProp = changes[propName];
        console.log(`changed artifact ${JSON.stringify(artifactProp.currentValue)}`);
        this.editForm.setValue({
          "artifactTypeId": artifactProp.currentValue.artifactTypeId?? ARTIFACT_TYPES[0].code,
          "artistId": artifactProp.currentValue.artistId? {id: artifactProp.currentValue.artistId, name: artifactProp.currentValue.artistName} : '',
          "title": artifactProp.currentValue.title?? '',
          "year": artifactProp.currentValue.year?? '',
          "duration": artifactProp.currentValue.duration?? '',
          "size": artifactProp.currentValue.size?? '',
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
    console.log(`Form data: ${JSON.stringify(this.editForm.value)}`)

    if (this.editForm.valid) {
      const artifactEditItem: ArtifactEditItem = {
        id: this.artifact?.id,
        artifactTypeId: this.editForm.value.artifactTypeId,
        artistId: this.editForm.value.artistId.id,
        artistName: this.editForm.value.artistId.name,
        title: this.editForm.value.title,
        year: this.editForm.value.year,
        duration: this.editForm.value.duration,
        size: this.editForm.value.size
      } as ArtifactEditItem;

      this.saveSubject.next(artifactEditItem);
    }
  }

  searchArtists(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredArtists = this.artists.filter(v => v.name.toLowerCase().indexOf(query) == 0);
  }
}
