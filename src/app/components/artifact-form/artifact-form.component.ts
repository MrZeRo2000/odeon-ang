import {Component, Input, OnInit} from '@angular/core';
import {
  ArtifactEditItem,
  ARTIFACT_MUSIC_TYPES,
  ArtifactConfigItem, getArtifactConfig
} from "../../model/artifacts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArtifactService} from "../../service/artifact.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {IdName} from "../../model/common";
import {BaseFormComponent} from "../base/base-form.component";

@Component({
  selector: 'app-artifact-form',
  templateUrl: './artifact-form.component.html',
  styleUrls: ['./artifact-form.component.scss']
})
export class ArtifactFormComponent extends BaseFormComponent<ArtifactEditItem> implements OnInit {
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
    this.artifactTypeConfig = getArtifactConfig(this.editItem?.artifactTypeId as number, this.artistTypeCode);
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
      artifactTypeId: this.editItem?.artifactTypeId?? '',
      artistId: this.editItem?.artistId? {id: this.editItem.artistId, name: this.editItem.artistName} : '',
      performerArtistId: this.editItem?.performerArtistId? {id: this.editItem.performerArtistId, name: this.editItem.performerArtistName} : '',
      title: this.editItem?.title?? '',
      year: this.editItem?.year?? '',
      duration: this.editItem?.duration?? '',
      size: this.editItem?.size?? '',
    })

  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  createSavedItem(): ArtifactEditItem {
    return {
      id: this.editItem?.id,
      artifactTypeId: this.editForm.value.artifactTypeId,
      artistId: this.editForm.value.artistId?.id,
      artistName: this.editForm.value.artistId?.name,
      performerArtistId: this.editForm.value.performerArtistId?.id,
      performerArtistName: this.editForm.value.performerArtistId?.name,
      title: this.editForm.value.title,
      year: this.editForm.value.year,
      duration: this.editForm.value.duration,
      size: this.editForm.value.size
    } as ArtifactEditItem;
  }


  searchArtists(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredArtists = [...this.artists.filter(v => v.name.toLowerCase().indexOf(query) == 0)];
  }

  searchPerformerArtists(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredPerformerArtists = [...this.artists.filter(v => v.name.toLowerCase().indexOf(query) == 0)];
  }
}
