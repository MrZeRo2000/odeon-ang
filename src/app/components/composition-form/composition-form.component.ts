import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CompositionEditItem} from "../../model/composition";
import {FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {ArtifactEditItem} from "../../model/artifacts";
import {CompositionService} from "../../service/composition.service";

@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
  styleUrls: ['./composition-form.component.scss']
})
export class CompositionFormComponent implements OnInit, OnChanges {

  @Input()
  display: boolean = false;
  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  @Input()
  composition?: CompositionEditItem;

  @Output()
  onSavedComposition: EventEmitter<CompositionEditItem> = new EventEmitter();

  submitted = false;

  editForm = this.fb.group({
    diskNum: ['1', Validators.required],
    num: ['1', Validators.required],
    title: ['', Validators.required],
    duration: ['', Validators.required],
    mediaName: [''],
    mediaFormat: [''],
    mediaSize: [''],
    mediaBitrate: [''],
    mediaDuration: [''],
  })

  private saveSubject: Subject<CompositionEditItem> = new Subject<CompositionEditItem>();

  saveAction$ = this.saveSubject.asObservable().pipe(
    switchMap(data => {
      const action$ = data.id ? this.compositionService.update(data) : this.compositionService.create(data);
      const actionName = data.id ? 'updating' : 'creating';
      return action$.pipe(
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error ${actionName} composition: ${err.error?.message || err.message}`
          });
          return of(undefined);
        })
      );
    }),
    tap(v => {
      if (!!v) {
        this.onSavedComposition.emit(v);
      }
    })
  );

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private compositionService: CompositionService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'composition') {
        const compositionProp = changes[propName];
        console.log(`changed artifact ${JSON.stringify(compositionProp.currentValue)}`);
        this.editForm.setValue({
          "diskNum": compositionProp.currentValue.diskNum?? '1',
          "num": compositionProp.currentValue.num?? '1',
          "title": compositionProp.currentValue.title?? '',
          "duration": compositionProp.currentValue.duration?? '',
          "mediaName": compositionProp.currentValue.mediaName?? '',
          "mediaFormat": compositionProp.currentValue.mediaFormat?? '',
          "mediaSize": compositionProp.currentValue.mediaSize?? '',
          "mediaBitrate": compositionProp.currentValue.mediaBitrate?? '',
          "mediaDuration": compositionProp.currentValue.mediaDuration?? '',
        })
      }
    }
  }

  hideDialog(): void {
    this.submitted = false;
    this.displayProp = false;
  }

  save(): void {
    this.submitted = true;
    console.log(`Form data: ${JSON.stringify(this.editForm.value)}`)

    const mediaFields = ['mediaFormat', 'mediaSize', 'mediaBitrate', 'mediaDuration']

    if (this.editForm.value.mediaName) {
      mediaFields.forEach(v => {
        if (!this.editForm.value[v]) {
          this.editForm.controls[v].setErrors({notNull: true})
        } else {
          this.editForm.controls[v].setErrors(null)
        }
      })
    }

    if (this.editForm.valid) {
      const compositionEditItem: CompositionEditItem = {
        id: this.composition?.id,
        artifactId: this.composition?.artifactId,
        diskNum: this.editForm.value.diskNum,
        num: this.editForm.value.num,
        title: this.editForm.value.title,
        duration: this.editForm.value.duration,
        mediaName: this.editForm.value.mediaName || undefined,
        mediaFormat: this.editForm.value.mediaFormat || undefined,
        mediaSize: this.editForm.value.mediaSize || undefined,
        mediaBitrate: this.editForm.value.mediaBitrate || undefined,
        mediaDuration: this.editForm.value.mediaDuration || undefined
      } as CompositionEditItem;

      this.saveSubject.next(compositionEditItem);
    }
  }
}
