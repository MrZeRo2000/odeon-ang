import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompositionEditItem} from "../../model/composition";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {ArtifactEditItem} from "../../model/artifacts";

@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
  styleUrls: ['./composition-form.component.scss']
})
export class CompositionFormComponent implements OnInit {

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
    title: ['', Validators.required],
    year: [''],
    duration: [''],
    size: ['']
  })

  private saveSubject: Subject<CompositionEditItem> = new Subject<CompositionEditItem>();

  saveAction$ = this.saveSubject.asObservable().pipe(
  );

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private compositionService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  hideDialog(): void {
    this.submitted = false;
    this.displayProp = false;
  }

  save(): void {
    this.submitted = true;
    console.log(`Form data: ${JSON.stringify(this.editForm.value)}`)

    if (this.editForm.valid) {
      const compositionEditItem: CompositionEditItem = {
      } as CompositionEditItem;

      this.saveSubject.next(compositionEditItem);
    }
  }

}
