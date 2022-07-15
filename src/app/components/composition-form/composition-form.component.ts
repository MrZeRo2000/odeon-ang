import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CompositionEditItem} from "../../model/composition";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {catchError, of, switchMap, tap} from "rxjs";
import {CompositionService} from "../../service/composition.service";
import {BaseFormComponent} from "../base/base-form.component";

@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
  styleUrls: ['./composition-form.component.scss']
})
export class CompositionFormComponent extends BaseFormComponent<CompositionEditItem> implements OnChanges {

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

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    override messageService: MessageService,
    private compositionService: CompositionService
  ) {
    super(messageService, compositionService)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const compositionProp = changes[propName];
        console.log(`changed composition ${JSON.stringify(compositionProp.currentValue)}`);
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

  override validate(): boolean {
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

    return this.editForm.valid;
  }

  override createSavedItem(): CompositionEditItem {
    return {
      id: this.editItem?.id,
      artifactId: this.editItem?.artifactId,
      diskNum: this.editForm.value.diskNum,
      num: this.editForm.value.num,
      title: this.editForm.value.title,
      duration: this.editForm.value.duration,
      mediaName: this.editForm.value.mediaName || undefined,
      mediaFormat: this.editForm.value.mediaFormat || undefined,
      mediaSize: this.editForm.value.mediaSize || undefined,
      mediaBitrate: this.editForm.value.mediaBitrate || undefined,
      mediaDuration: this.editForm.value.mediaDuration || undefined
    } as CompositionEditItem
  }
}
