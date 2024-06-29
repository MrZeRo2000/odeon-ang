import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {startWith, tap} from "rxjs";

@Component({
  selector: 'app-media-files-load-form',
  templateUrl: './media-files-load-form.component.html',
  styleUrl: './media-files-load-form.component.scss'
})
export class MediaFilesLoadFormComponent extends BaseFormComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService) {
    super();
  }

  ngOnInit(): void {
    // https://github.com/primefaces/primeng/issues/14454
    this.optionMediaFileNames = this.mediaFileNames.map(v => {return {
      label: v,
      value: v
    }})
  }

  public execute(): void {
    console.log(`Form selectedMediaFileNames value: ${JSON.stringify(this.editForm.value.selectedMediaFileNames)}`)
  }
}
