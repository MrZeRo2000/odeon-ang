import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {catchError, of, startWith, Subject, switchMap, tap} from "rxjs";
import {MediaFileService} from "../../../service/media-file.service";

@Component({
    selector: 'app-media-files-load-form',
    templateUrl: './media-files-load-form.component.html',
    styleUrl: './media-files-load-form.component.scss',
    standalone: false
})
export class MediaFilesLoadFormComponent extends BaseFormComponent implements OnInit {
  @Input()
  public artifactId!: number;

  @Input()
  public mediaFileNames: Array<string> = []

  @Output()
  public onExecute: EventEmitter<void> = new EventEmitter();

  public optionMediaFileNames: Array<any> = []

  editForm = this.fb.group({
    selectedMediaFileNames: ['', Validators.nullValidator],
  })

  editFormData$ = this.editForm.valueChanges.pipe(
    startWith({'selectedMediaFileNames': []}),
    tap(v => console.log(`editForm current value: ${v.selectedMediaFileNames}`))
  );

  private executeSubject = new Subject<Array<string>>();

  execute$ = this.executeSubject.asObservable().pipe(
    switchMap(v => {
      return this.mediaFileService.insertMediaFiles(this.artifactId, v).pipe(
        tap(r => {
          this.messageService.add({
            severity:'success',
            summary:'Success',
            detail:`Loaded ${r.rowsAffected} media file` + (r.rowsAffected === 1 ? `` : `s`)
          });
          this.onExecute.next()
        }),
        catchError(error => {
          this.messageService.add({severity:'error', summary:'Error', detail:`Error loading media files`});
          const errorMessage = error.error?.message
          if (errorMessage) {
            this.messageService.add({severity:'info', summary:'Details', detail:errorMessage});
          }
          return of(undefined);
        })
      )
    })
  );

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private mediaFileService: MediaFileService) {
    super();
  }

  ngOnInit(): void {
    // https://github.com/primefaces/primeng/issues/14454
    this.optionMediaFileNames = this.mediaFileNames.map(v => {return {
      label: v,
      value: v
    }})
  }

  public execute(event: any, mediaFileNames: any): void {
    event.preventDefault();
    this.executeSubject.next(mediaFileNames as string[])
  }
}
