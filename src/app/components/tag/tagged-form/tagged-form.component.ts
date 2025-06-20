import {Component, Input} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {Tagged} from "../../../model/tag";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {TaggedService} from "../../../service/tagged.service";
import {filterString} from "../../../utils/search-utils";
import {ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-tagged-form',
  templateUrl: './tagged-form.component.html',
  styleUrl: './tagged-form.component.css',
  standalone: false
})
export class TaggedFormComponent extends BaseCrudFormComponent<Tagged> {
  @Input()
  tagResourceName: string = ""

  @Input()
  tags: Array<string> = []

  editForm: FormGroup = this.fb.group({
    tags: [[]]
  });

  filteredTags: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    override messageService: MessageService,
    private taggedService: TaggedService,
    private confirmationService: ConfirmationService,
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
    this.taggedService.taggedResourceName = this.tagResourceName;
    return {
      id: this.editItem?.id,
      tags: this.editForm.value.tags
    } as Tagged
  }

  searchTags(event: any): void {
    this.filteredTags = filterString(this.tags, event.query);
  }

  tagsKeyUp(event: any): void {
    if (
      (event.keyCode == ENTER) &&
      !!event.target.value &&
      this.editForm.value.tags.indexOf(event.target.value) === -1
    ) {
      console.log(`Selected ${event.target.value}`);
      const value = event.target.value;

      this.confirmationService.confirm({
        key: "tags",
        target: event.target,
        message: `Are you sure that you want to add ${value }?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.filteredTags.push(value);
          this.editForm.value.tags.push(value);
          event.target.value = '';
          event.target.focus();
        }
      });
    }
  }

}
