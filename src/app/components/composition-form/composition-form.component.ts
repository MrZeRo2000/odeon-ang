import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CompositionEditItem} from "../../model/composition";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {CompositionService} from "../../service/composition.service";
import {BaseFormComponent} from "../base/base-form.component";
import {IdName} from "../../model/media-file";

@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
  styleUrls: ['./composition-form.component.scss']
})
export class CompositionFormComponent extends BaseFormComponent<CompositionEditItem> implements OnChanges {

  @Input()
  mediaFileTable: IdName[] = [];

  editForm = this.fb.group({
    diskNum: ['1', Validators.required],
    num: ['1', Validators.required],
    title: ['', Validators.required],
    duration: ['', Validators.required],
    mediaFileIds: [[]]
  })

  constructor(
    private fb: FormBuilder,
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
          "mediaFileIds": compositionProp.currentValue.mediaFileIds?? []
        })
      }
    }
  }

  override validate(): boolean {
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
      mediaFileIds: this.editForm.value.mediaFileIds,
    } as CompositionEditItem
  }
}
