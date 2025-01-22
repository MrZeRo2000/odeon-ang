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
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-tracks-update-durations-form',
    templateUrl: './tracks-update-durations-form.component.html',
    styleUrl: './tracks-update-durations-form.component.scss',
    standalone: false
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
    private datePipe: DatePipe,
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

  onConvertDurationsToChapters(event: any, mediaFile: string, chapters: string[]): void {
    event.preventDefault();
    // console.log(`onConvertDurationsToChapters mediaFile=${mediaFile}, chapters=${chapters}, duration=${this.getMediaFileDuration(mediaFile)}`)
    const numChapters: number[] = chapters.map(v => Number.parseInt(v, 10)).filter(v => !isNaN(v))

    if (numChapters.length > 0) {
      const duration = numChapters.reduce((a, v) => a + v, 0)
      const targetDuration = this.getMediaFileDuration(mediaFile);

      const accChapters = numChapters.reduce(
        (a, v) => {
          a.push((a[a.length-1] || 0)  + Math.floor(v * targetDuration / duration));
          return a;},
        [] as number[])
      if (accChapters.length > 1) {

        const timeChapters = accChapters.map(
          v => this.datePipe.transform(v * 1000, 'HH:mm:ss', 'GMT'))

        this.editForm.patchValue({'chapters': timeChapters.slice(0, -1).join("\n")})
      }
    }
  }

  getMediaFileDuration(value: string | null | undefined): number {
    return this.mediaFiles.find(v => v.id as number === Number.parseInt(value?? "0", 10))?.duration ?? 0
  }
}
