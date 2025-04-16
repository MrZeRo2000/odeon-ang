import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {MediaFile} from "../../../model/media-file";
import {DV_TYPES, DVType} from "../../../model/dvtype";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserImportService} from "../../../service/user-import.service";
import {Artifact, isArtifactTypeVideoMusic, isArtifactTypeVideoWithProducts, } from "../../../model/artifacts";
import {ImportStats, TrackUserImport} from "../../../model/user-import";
import {catchError, Observable, of, Subject, switchMap, tap} from "rxjs";
import {textToArray} from "../../../utils/form-utils";


@Component({
    selector: 'app-tracks-import-form',
    templateUrl: './tracks-import-form.component.html',
    styleUrls: ['./tracks-import-form.component.css'],
    standalone: false
})
export class TracksImportFormComponent extends BaseFormComponent implements OnInit {
  @ViewChild('autofocused', { static: false}) autoFocused!: any;

  textToArray = textToArray

  DV_TYPES = DV_TYPES;
  readonly NUM_OPTIONS = [{'id': 1, 'name': '1'}]

  @Input()
  public artifact?: Artifact;

  @Input()
  public mediaFiles: Array<MediaFile> = []

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  isArtifactTypeVideoMusic = false;
  isArtifactTypeVideoWithProducts = false;

  editForm: FormGroup = this.fb.group({})

  editFormData$ = this.editForm.valueChanges;

  private importSubject: Subject<TrackUserImport> = new Subject()

  import$: Observable<ImportStats | undefined> = this.importSubject.asObservable().pipe(
    switchMap(v =>
      this.userImportService.tracksExecute(v).pipe(
        tap(r => {
          this.messageService.add({severity:'success', summary:'Success', detail:`Imported ${r.rowsInserted.length} tracks`});
          this.onImport.next()
        }),
        catchError(error => {
          this.messageService.add({severity:'error', summary:'Error', detail:`Error executing import`});
          const errorMessage = error.error?.message
          if (errorMessage) {
            this.messageService.add({severity:'error', summary:'Details', detail:errorMessage});
          }
          return of(undefined);
        })
      )
    )
  )

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
    this.isArtifactTypeVideoMusic = isArtifactTypeVideoMusic(this.artifact?.artifactType?.id)
    this.isArtifactTypeVideoWithProducts = isArtifactTypeVideoWithProducts(this.artifact?.artifactType?.id)

    this.editForm = this.fb.group({
      mediaFile: ['', Validators.required],
      dvType: [8, Validators.required],
      num: ['', Validators.pattern('[1-9][0-9]*$')],
      titles: ['', Validators.required],
      artists: [''],
      chapters: ['', this.isArtifactTypeVideoWithProducts ? Validators.required : Validators.nullValidator],
    })

    this.editFormData$ = this.editForm.valueChanges;
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.el.nativeElement.querySelector('span').focus();
    }, 200)
  }

  private getFormData(): TrackUserImport {
    const titles = textToArray(this.editForm.value.titles);
    const artists = textToArray(this.editForm.value.artists);
    const chapters = textToArray(this.editForm.value.chapters);

    return {
      artifact: this.artifact as Artifact,
      mediaFile: {id: this.editForm.value.mediaFile} as MediaFile,
      dvType: {id: this.editForm.value.dvType} as DVType,
      num: this.editForm.value.num?? null,
      titles,
      artists,
      chapters
    }
  }

  executeImport(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      console.log(`Form data: ${JSON.stringify(this.getFormData())}`)
      this.importSubject.next(this.getFormData())
    }
  }
}
