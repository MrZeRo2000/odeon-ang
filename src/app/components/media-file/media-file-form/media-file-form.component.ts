import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {MediaFile} from "../../../model/media-file";
import {
  AbstractControl,
  FormGroup,
  UntypedFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MessageService} from "primeng/api";
import {MediaFileService} from "../../../service/media-file.service";
import {DV_TYPES} from "../../../model/dvtype";
import {
  catchError,
  concat,
  delay,
  Observable,
  of, Subject, switchMap, tap
} from "rxjs";
import {TextInterface} from "../../../model/common";

@Component({
    selector: 'app-media-file-form',
    templateUrl: './media-file-form.component.html',
    styleUrls: ['./media-file-form.component.css'],
    standalone: false
})
export class MediaFileFormComponent extends BaseCrudFormComponent<MediaFile> implements OnChanges {
  @ViewChild('autofocused', { static: false}) autoFocused!: any;

  @Input()
  isVideo: boolean = false;

  editForm: FormGroup = this.fb.group({});

  mediaFileNames!: Observable<Array<TextInterface>>;

  mediaFileAttributesSubject = new Subject<MediaFile>();

  mediaFileAttributesAction$ = this.mediaFileAttributesSubject.asObservable().pipe(
    switchMap(v => {
      return this.mediaFileService.getMediaFileAttributes(v.artifactId, v.name).pipe(
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting media file attributes`
          });
          return of({} as MediaFile);
        })
      )
    }),
    tap(v => {
      if (!!v && Object.keys(v).length > 0) {
        Object
          .keys(v)
          .filter(k => k !== 'name')
          .forEach(k => {
            let pv = {} as any
            pv[k] = (v as any)[k]
            this.editForm.patchValue(pv)
          })
        this.messageService.add({
          severity: 'success',
          summary: 'Info',
          detail: `Updated media file attributes`
        });
      }
    })
  )

  constructor(
    private fb: UntypedFormBuilder,
    override messageService: MessageService,
    protected mediaFileService: MediaFileService,
  ) {
    super(messageService, mediaFileService)
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.el.nativeElement.querySelector('input').focus();
    }, 200)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const mediaFileProp = changes[propName];
        console.log(`changed media file ${JSON.stringify(mediaFileProp.currentValue)}, isVideo=${this.isVideo}`);

        this.mediaFileNames = concat(
          of([]) as Observable<Array<TextInterface>>,
          this.mediaFileService.getTableFiles(this.editItem?.artifactId!).pipe(
            delay(0))
        )

        this.editForm = this.fb.group({
          name: [mediaFileProp.currentValue.name?? '', Validators.required],
          format: [mediaFileProp.currentValue.format?? '', Validators.required],
          size: [mediaFileProp.currentValue.size?? '', Validators.required],
          bitrate: [mediaFileProp.currentValue.bitrate?? '', Validators.required],
          duration: [mediaFileProp.currentValue.duration?? '', Validators.required],
          width: [mediaFileProp.currentValue.width?? '', this.isVideo ? Validators.required : Validators.nullValidator],
          height: [mediaFileProp.currentValue.height?? '', this.isVideo ? Validators.required : Validators.nullValidator],
          extra: [mediaFileProp.currentValue.extra?? '', this.createExtraValidator()],
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
      extra: this.editForm.value.extra.trim().length == 0 ? null : this.editForm.value.extra.trim(),
    } as MediaFile
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  createExtraValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      let object;
      try {
        object = JSON.parse(value)
      } catch (e) {
        return {extra: "Error parsing extra value"}
      }

      if (!object.extra) {
        return {extra: "Extra value not found"}
      }

      if (!object.extra.length) {
        return {extra: "Empty array"}
      }

      for (const element of object.extra) {
        if (!element.match(/\d{2}:\d{2}:\d{2}/)) {
          return {extra: `Error parsing element (match) ${element}`}
        }
        const dt = new Date(`2000-01-01T${element}`);
        if (!(dt.getDate())) {
          return {extra: `Error parsing element (date) ${element}`}
        }
      }

      return null;

    }
  }

  onUpdateMediaFileAttributes(event: any): void {
    event.preventDefault();
    if (this.editItem?.artifactId && this.editForm.value.name) {
      this.mediaFileAttributesSubject.next({artifactId: this.editItem?.artifactId, name: this.editForm.value.name} as MediaFile)
    }
  }

  searchMediaFile(): void {

  }

  protected readonly JSON = JSON;
  protected readonly DV_TYPES = DV_TYPES;
}
