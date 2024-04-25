import {Component, Input, OnInit} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {Artifact} from "../../../model/artifacts";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ArtifactTagService} from "../../../service/artifact-tag.service";
import {filterString} from "../../../utils/search-utils";
import {ENTER} from "@angular/cdk/keycodes";


@Component({
  selector: 'app-artifact-tags-form',
  templateUrl: './artifact-tags-form.component.html',
  styleUrl: './artifact-tags-form.component.scss'
})
export class ArtifactTagsFormComponent extends BaseCrudFormComponent<Artifact> implements OnInit {

  @Input({transform: (value: any[] | (any[] | Artifact)[] | Array<Artifact>): Array<Artifact> => value as Array<Artifact>})
  artifacts: Array<Artifact> = []

  editForm: FormGroup = this.fb.group({
    tags: [[]]
  });

  allTags: Array<string> = [];
  filteredTags: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    override messageService: MessageService,
    private artifactTagService: ArtifactTagService,
    private confirmationService: ConfirmationService,
  ) {
    super(messageService, artifactTagService);
  }

  ngOnInit(): void {
    console.log(`ArtifactTagsForm editItem: ${JSON.stringify(this.editItem)}`)
    console.log(`ArtifactTagsForm artifacts: ${this.artifacts.length} items`)
    this.editForm.setValue({
      tags: [... this.editItem?.tags || []]
    })
  }

  createSavedItem(): Artifact {
    return {
      id: this.editItem?.id,
      tags: this.editForm.value.tags
    } as Artifact;
  }

  searchTags(event: any): void {
    if (this.allTags.length == 0) {
      this.allTags = [... new Set(this.artifacts.flatMap(v => v.tags || []).filter(v => !!v))].sort();
    }

    this.filteredTags = filterString(this.allTags, event.query);
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
