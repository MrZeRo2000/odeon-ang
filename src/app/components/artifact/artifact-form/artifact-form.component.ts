import {Component, Input, OnInit} from '@angular/core';
import {
  ARTIFACT_MUSIC_TYPES,
  ArtifactConfigItem, getArtifactConfig, Artifact
} from "../../../model/artifacts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArtifactService} from "../../../service/artifact.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {IdName} from "../../../model/common";
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {filterIdName} from "../../../utils/search-utils";

@Component({
  selector: 'app-artifact-form',
  templateUrl: './artifact-form.component.html',
  styleUrls: ['./artifact-form.component.scss']
})
export class ArtifactFormComponent extends BaseCrudFormComponent<Artifact> implements OnInit {
  readonly ARTIFACT_TYPES = ARTIFACT_MUSIC_TYPES;

  @Input()
  artists: Array<IdName> = [];

  @Input()
  artistTypeCode: string = 'A';

  filteredArtists: Array<IdName> = [];
  filteredPerformerArtists: Array<IdName> = [];

  isSelectableArtifactTypeId(artifactTypeId: number) : boolean {
    return this.ARTIFACT_TYPES.map(v => v['code']).indexOf(artifactTypeId) !== -1;
  }

  artifactTypeConfig?: ArtifactConfigItem;

  editForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    override messageService: MessageService,
    private artifactService: ArtifactService
  ) { super(messageService, artifactService) }

  ngOnInit(): void {
    this.artifactTypeConfig = getArtifactConfig(this.editItem?.artifactType?.id as number, this.artistTypeCode);
    console.log(`ArtifactForm: onInit: config: ${JSON.stringify(this.artifactTypeConfig)}`);
    this.editForm = this.fb.group({
      artifactTypeId: ['', Validators.required],
      artistId: ['', this.artifactTypeConfig?.requiresArtist ? Validators.required : null],
      performerArtistId: ['', this.artifactTypeConfig?.requiresPerformerArtist? Validators.required : null],
      title: ['', Validators.required],
      year: ['', this.artifactTypeConfig?.requiresYear? Validators.required : null],
      duration: [''],
      size: ['']
    });

    this.editForm.setValue({
      artifactTypeId: this.editItem?.artifactType?.id?? '',
      artistId: this.editItem?.artist? {id: this.editItem.artist.id, name: this.editItem.artist.artistName} : '',
      performerArtistId: this.editItem?.performerArtist? {id: this.editItem.performerArtist.id, name: this.editItem.performerArtist.artistName} : '',
      title: this.editItem?.title?? '',
      year: this.editItem?.year?? '',
      duration: this.editItem?.duration?? '',
      size: this.editItem?.size?? '',
    })

  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  createSavedItem(): Artifact {
    return {
      id: this.editItem?.id,
      artifactType: {id: this.editForm.value.artifactTypeId} as IdName,
      artist: {id: this.editForm.value.artistId?.id, artistName: this.editForm.value.artistId?.name},
      performerArtis: {id: this.editForm.value.performerArtistId?.id, artistName: this.editForm.value.performerArtistId?.name},
      title: this.editForm.value.title,
      year: this.editForm.value.year,
      duration: this.editForm.value.duration,
      size: this.editForm.value.size
    } as Artifact;
  }


  searchArtists(event: any): void {
    this.filteredArtists = filterIdName(this.artists, event.query)
  }

  searchPerformerArtists(event: any): void {
    this.filteredPerformerArtists = filterIdName(this.artists, event.query)
  }
}
