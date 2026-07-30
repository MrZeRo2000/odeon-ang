import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {Artifact} from "../../../model/artifacts";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {TrackService} from "../../../service/track.service";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {Track, TrackSelectedDVTypeUserUpdate} from "../../../model/track";
import {DV_TYPES, DVType} from "../../../model/dvtype";

@Component({
    selector: 'app-tracks-update-selected-video-types-form',
    templateUrl: './tracks-update-selected-video-types-form.component.html',
    styleUrl: './tracks-update-selected-video-types-form.component.css',
    standalone: false
})

export class TracksUpdateSelectedVideoTypesFormComponent extends BaseFormComponent {
  @ViewChild('autofocused', { static: false}) autoFocused!: any;

  DV_TYPES = DV_TYPES;

  @Input()
  public artifact!: Artifact;

  @Input()
  public tracks!: Array<Track>;

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  editForm = this.fb.group({
    dvTypeId: ['', Validators.required]
  })

  updateSubject = new Subject<TrackSelectedDVTypeUserUpdate>();

  update$ = this.updateSubject.asObservable().pipe(
    switchMap(v => this.trackService.updateSelectedVideoTypes(v).pipe(
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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private trackService: TrackService,
  ) {
    super();
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.el.nativeElement.querySelector('span').focus();
    }, 200)
  }

  private getFormData(): TrackSelectedDVTypeUserUpdate {
    return {
      artifact: this.artifact as Artifact,
      trackIds: this.tracks.map(v => v.id),
      dvType: this.editForm.value.dvTypeId ? <unknown>{id: this.editForm.value.dvTypeId} as DVType : {},
    } as TrackSelectedDVTypeUserUpdate
  }

  execute(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.updateSubject.next(this.getFormData())
    }
  }

}
