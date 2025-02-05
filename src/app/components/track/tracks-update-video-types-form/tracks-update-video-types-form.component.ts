import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {Artifact} from "../../../model/artifacts";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {TrackService} from "../../../service/track.service";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {TrackDVTypeUserUpdate} from "../../../model/track";
import {DV_TYPES, DVType} from "../../../model/dvtype";

@Component({
    selector: 'app-tracks-update-video-types-form',
    templateUrl: './tracks-update-video-types-form.component.html',
    styleUrl: './tracks-update-video-types-form.component.scss',
    standalone: false
})

export class TracksUpdateVideoTypesFormComponent extends BaseFormComponent {
  @ViewChild('autofocused', { static: false}) autoFocused!: any;

  DV_TYPES = DV_TYPES;

  @Input()
  public artifact?: Artifact;

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  editForm = this.fb.group({
    dvTypeId: ['', Validators.required]
  })

  updateSubject = new Subject<TrackDVTypeUserUpdate>();

  update$ = this.updateSubject.asObservable().pipe(
    switchMap(v => this.trackService.updateVideoTypes(v).pipe(
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

  private getFormData(): TrackDVTypeUserUpdate {
    return {
      artifact: this.artifact as Artifact,
      dvType: this.editForm.value.dvTypeId ? <unknown>{id: this.editForm.value.dvTypeId} as DVType : {},
    } as TrackDVTypeUserUpdate
  }

  execute(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.updateSubject.next(this.getFormData())
    }
  }

}
