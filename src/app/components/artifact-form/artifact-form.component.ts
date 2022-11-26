import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtifactEditItem, ARTIFACT_MUSIC_TYPES, ARTIFACT_TYPE_MUSIC, ARTIFACT_TYPE_VIDEO} from "../../model/artifacts";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {ArtifactService} from "../../service/artifact.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {IdName} from "../../model/common";
import {ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-artifact-form',
  templateUrl: './artifact-form.component.html',
  styleUrls: ['./artifact-form.component.scss']
})
export class ArtifactFormComponent implements OnInit, OnChanges {
  readonly ARTIFACT_TYPE_MUSIC = ARTIFACT_TYPE_MUSIC;

  readonly ARTIFACT_TYPE_VIDEO = ARTIFACT_TYPE_VIDEO;

  readonly ARTIFACT_TYPES = ARTIFACT_MUSIC_TYPES;

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

  @Input()
  artistTypeCode: string = 'A';

  filteredArtists: Array<IdName> = [];
  filteredPerformerArtists: Array<IdName> = [];

  @Output()
  savedArtifactEvent: EventEmitter<ArtifactEditItem> = new EventEmitter();

  submitted = false;

  artistInput?: string;

  editForm = this.fb.group({
    artifactTypeId: ['', Validators.required],
    artistId: ['', Validators.required],
    performerArtistId: [''],
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

  isSelectableArtifactTypeId(artifactTypeId: number) : boolean {
    return this.ARTIFACT_TYPES.map(v => v['code']).indexOf(artifactTypeId) !== -1;
  }

  constructor(
    private fb: UntypedFormBuilder,
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
          "artifactTypeId": artifactProp.currentValue.artifactTypeId,
          "artistId": artifactProp.currentValue.artistId? {id: artifactProp.currentValue.artistId, name: artifactProp.currentValue.artistName} : '',
          "performerArtistId": artifactProp.currentValue.performerArtistId? {id: artifactProp.currentValue.performerArtistId, name: artifactProp.currentValue.performerArtistName} : '',
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
        performerArtistId: this.editForm.value.performerArtistId?.id,
        performerArtistName: this.editForm.value.performerArtistId?.name,
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
    this.filteredArtists = [...this.artists.filter(v => v.name.toLowerCase().indexOf(query) == 0)];
  }

  searchPerformerArtists(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredPerformerArtists = [...this.artists.filter(v => v.name.toLowerCase().indexOf(query) == 0)];
  }

  /*
  onArtistKeyUp(event: any): void {
    if (
      (event.keyCode == ENTER) &&
      !this.editForm.value.artistId &&
      !!this.artistInput &&
      this.artists.filter(v => v.name.toLowerCase() === this.artistInput?.toLowerCase()).length === 0
    ) {
      console.log(`Entered new to add: ${this.artistInput}`)
    } else {
      this.artistInput = event.target.value;
    }
  }
   */

}
