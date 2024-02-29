import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {Artifact} from "../../../model/artifacts";
import {MediaFile} from "../../../model/media-file";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {TrackDurationsUserUpdate} from "../../../model/track";
import {TrackService} from "../../../service/track.service";
import {MediaFileService} from "../../../service/media-file.service";
import {textToArray} from "../../../utils/form-utils";

@Component({
  selector: 'app-tracks-update-durations-form',
  templateUrl: './tracks-update-durations-form.component.html',
  styleUrl: './tracks-update-durations-form.component.scss'
})
export class TracksUpdateDurationsFormComponent extends BaseFormComponent {
  @Input()
  public artifact?: Artifact;

  @Input()
  public mediaFiles: Array<MediaFile> = []

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  editForm = this.fb.group({
    mediaFile: ['', Validators.required],
    chapters: ['', Validators.required],
  })

  editFormData$ = this.editForm.valueChanges;

  updateSubject = new Subject<TrackDurationsUserUpdate>();

  update$ = this.updateSubject.asObservable().pipe(
    switchMap(v => this.trackService.updateTrackDurations(v).pipe(
      tap(r => {
        this.messageService.add({severity:'success', summary:'Success', detail:`Updated ${r.rowsAffected} tracks`});
        this.onImport.next()
      }),
      catchError(error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Error executing update`});
        const errorMessage = error.error?.message
        if (errorMessage) {
          this.messageService.add({severity:'error', summary:'Details', detail:errorMessage});
        }
        return of(undefined);
      })
    ))
  )

  updateChaptersSubject = new Subject<number>();

  updateChapters$ = this.updateChaptersSubject.asObservable().pipe(
    switchMap(v => this.mediaFileService.get(v).pipe(
      tap(r => {
        const extra = JSON.parse(r.extra as string)["extra"];
        this.editForm.patchValue({'chapters': extra.join('\n')})

      }),
      catchError(() => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Error obtaining media file chapters data`});
        return of(undefined)
      })
    ))
  )

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private trackService: TrackService,
    private mediaFileService: MediaFileService,
  ) {
    super();
  }

  getChapters(value: string): Array<string> {
    return textToArray(value)
  }

  private getFormData(): TrackDurationsUserUpdate {
    const chapters = this.getChapters(this.editForm.value.chapters as string);

    return {
      artifact: this.artifact as Artifact,
      mediaFile: {id: this.editForm.value.mediaFile} as MediaFile,
      chapters
    }
  }

  execute(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.updateSubject.next(this.getFormData())
    }
  }

  onUpdateChaptersFromMediaFile(event: any, value: string) {
    event.preventDefault();
    this.updateChaptersSubject.next(Number.parseInt(value, 10))
  }

  getMediaFileDuration(value: string | null | undefined): number {
    return this.mediaFiles.find(v => v.id as number === Number.parseInt(value?? "0", 10))?.duration ?? 0
  }
}
