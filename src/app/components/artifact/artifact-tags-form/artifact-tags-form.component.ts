import {Component, Input, OnInit} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {Artifact} from "../../../model/artifacts";
import {MessageService} from "primeng/api";
import {ArtifactService} from "../../../service/artifact.service";
import {FormBuilder, FormGroup} from "@angular/forms";


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

  constructor(
    private fb: FormBuilder,
    override messageService: MessageService,
    private artifactService: ArtifactService,
  ) {
    super(messageService, artifactService);
  }

  ngOnInit(): void {
    console.log(`ArtifactTagsForm editItem: ${JSON.stringify(this.editItem)}`)
    console.log(`ArtifactTagsForm artifacts: ${this.artifacts.length} items`)
    this.editForm.setValue({
      tags: this.editItem?.tags
    })
  }

  createSavedItem(): Artifact {
    return {} as Artifact;
  }

}
