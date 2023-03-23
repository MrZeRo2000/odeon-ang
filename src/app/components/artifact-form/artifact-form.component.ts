import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  ArtifactEditItem,
  ARTIFACT_MUSIC_TYPES,
  ARTIFACT_TYPE_MUSIC,
  ARTIFACT_TYPE_VIDEO,
  isArtifactTypeVideoMusic, ArtifactTypeConfigItem, getArtifactTypeConfigByCode
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
export class ArtifactFormComponent extends BaseFormComponent<ArtifactEditItem> implements OnChanges, OnInit {
  readonly ARTIFACT_TYPE_MUSIC = ARTIFACT_TYPE_MUSIC;

  readonly ARTIFACT_TYPE_VIDEO = ARTIFACT_TYPE_VIDEO;

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

  isArtifactTypeVideoMusic = false;
  artifactTypeConfig?: ArtifactTypeConfigItem;

  editForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    override messageService: MessageService,
    private artifactService: ArtifactService
  ) { super(messageService, artifactService) }

  ngOnInit(): void {
    console.log('ArtifactForm onInit');
    this.editForm = this.fb.group({
      artifactTypeId: ['', Validators.required],
      artistId: ['', this.artifactTypeConfig?.hasArtist ? Validators.required : null],
      performerArtistId: [''],
      title: ['', Validators.required],
      year: [''],
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ArtifactForm ngOnChanges');
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const artifactProp = changes[propName];
        console.log(`changed editItem ${JSON.stringify(artifactProp.currentValue)}`);
        /*
        this.editForm.setValue({
          "artifactTypeId": artifactProp.currentValue.artifactTypeId,
          "artistId": artifactProp.currentValue.artistId? {id: artifactProp.currentValue.artistId, name: artifactProp.currentValue.artistName} : '',
          "performerArtistId": artifactProp.currentValue.performerArtistId? {id: artifactProp.currentValue.performerArtistId, name: artifactProp.currentValue.performerArtistName} : '',
          "title": artifactProp.currentValue.title?? '',
          "year": artifactProp.currentValue.year?? '',
          "duration": artifactProp.currentValue.duration?? '',
          "size": artifactProp.currentValue.size?? '',
        });
         */
        this.isArtifactTypeVideoMusic = isArtifactTypeVideoMusic(artifactProp.currentValue.artifactTypeId);
        this.artifactTypeConfig = getArtifactTypeConfigByCode(artifactProp.currentValue.artifactTypeId);
        console.log(`artifactTypeConfig: ${JSON.stringify(this.artifactTypeConfig)}`)
      }
    }
  }

  createSavedItem(): ArtifactEditItem {
    return {
      id: this.editItem?.id,
      artifactTypeId: this.editForm.value.artifactTypeId,
      artistId: this.editForm.value.artistId.id,
      artistName: this.editForm.value.artistId.name,
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
