import {Component, Input} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {Tagged} from "../../../model/tag";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {TaggedService} from "../../../service/tagged.service";

@Component({
  selector: 'app-tagged-form',
  templateUrl: './tagged-form.component.html',
  styleUrl: './tagged-form.component.css',
  standalone: false
})
export class TaggedFormComponent extends BaseCrudFormComponent<Tagged> {

  @Input()
  tags: Array<string> = []

  editForm: FormGroup = this.fb.group({
    tags: [[]]
  });

  constructor(
    private fb: FormBuilder,
    override messageService: MessageService,
    taggedService: TaggedService,
  ) {
    super(messageService, taggedService);
  }

  ngOnInit(): void {
    console.log(`EditItem: ${JSON.stringify(this.editItem)}`)
    this.editForm.setValue({
      tags: [... this.editItem?.tags || []]
    })
  }

  override createSavedItem(): Tagged {
      throw new Error('Method not implemented.');
  }
}
