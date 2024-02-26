import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {getTrackConfig, Track, TrackConfigItem} from "../../../model/track";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {TrackService} from "../../../service/track.service";
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {IdName, IdTitle} from "../../../model/common";
import {
  Artifact,
  isArtifactTypeMusic,
  isArtifactTypeVideo
} from "../../../model/artifacts";
import {DV_TYPES, DVType} from "../../../model/dvtype";
import {filterIdName, filterIdTitle} from "../../../utils/search-utils";
import {Artist} from "../../../model/artists";
import {DVProduct} from "../../../model/dv-product";
import {MediaFile} from "../../../model/media-file";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss'],
})
export class TrackFormComponent extends BaseCrudFormComponent<Track> implements OnChanges, OnInit {
  DV_TYPES = DV_TYPES;

  @Input()
  mediaFileTable: MediaFile[] = [];

  @Input()
  artistsTable: IdName[] = [];

  @Input()
  dvProductsTable: IdTitle[] = []

  @Input()
  artistTypeCode: string = 'A';

  @Input()
  artifactTypeId?: number;

  isArtifactTypeMusic = true;
  isArtifactTypeVideo = false;
  artifactTypeConfig?: TrackConfigItem;

  filteredArtists: Array<IdName> = [];
  filteredPerformerArtists: Array<IdName> = [];
  filteredDvProducts: Array<IdTitle> = [];

  editForm: FormGroup = this.fb.group({});

  editFormData$: Observable<any> = this.editForm.valueChanges;

  editMediaFileIds: Array<number> = [];

  constructor(
    private fb: FormBuilder,
    override messageService: MessageService,
    private trackService: TrackService
  ) {
    super(messageService, trackService)
  }

  ngOnInit(): void {
    this.artifactTypeConfig = getTrackConfig(this.artifactTypeId as number, this.artistTypeCode)
    console.log(`TrackFormComponent: onInit: config: ${JSON.stringify(this.artifactTypeConfig)}`);
    console.log(`TrackFormComponent: onInit: editItem: ${JSON.stringify(this.editItem)}`);

    this.editForm = this.fb.group({
      artistId: this.editItem?.artist?.id ? {id: this.editItem.artist?.id, name: this.editItem.artist?.artistName} : '',
      performerArtistId: this.editItem?.performerArtist?.id ? {id: this.editItem.performerArtist?.id, name: this.editItem.performerArtist?.artistName} : '',
      dvTypeId: ['', this.artifactTypeConfig?.hasDvType? Validators.required : Validators.nullValidator],
      title: ['', Validators.required],
      duration: [''],
      diskNum: ['', this.artifactTypeConfig?.hasDiskNum? Validators.required : Validators.nullValidator],
      num: ['1', Validators.required],
      mediaFileIds: [[]],
      dvProductId: [''],
    });

    // common values without defaults
    this.editForm.setValue({
      "artistId": this.editItem?.artist?.id? {id: this.editItem.artist?.id, name: this.editItem.artist?.artistName} : '',
      "performerArtistId": this.editItem?.performerArtist?.id? {id: this.editItem.performerArtist?.id, name: this.editItem.performerArtist?.artistName} : '',
      "dvTypeId": '',
      "title": this.editItem?.title?? '',
      "duration": this.editItem?.duration?? '',
      "diskNum": '',
      "num": this.editItem?.num?? '1',
      "mediaFileIds": this.editItem?.mediaFiles?.map(m => {return m.id})?? [],
      "dvProductId": this.editItem?.dvProduct?.id? {id: this.editItem.dvProduct?.id, title: this.editItem.dvProduct?.title} : '',
    });

    // default values
    if (this.artifactTypeConfig?.hasDiskNum) {
      this.editForm.patchValue({"diskNum": this.editItem?.diskNum?? 1});
    }

    if (this.artifactTypeConfig?.hasDvType) {
      this.editForm.patchValue({"dvTypeId": this.editItem?.dvType?.id?? 8});
    }

    this.editMediaFileIds = this.editForm.value.mediaFileIds;

    this.editFormData$ = this.editForm.valueChanges.pipe(
      tap(v => {
        if (this.editMediaFileIds !== v["mediaFileIds"]) {
          this.updateFormDuration(v["mediaFileIds"]);
          this.editMediaFileIds = v["mediaFileIds"]
        }
      })
    );
  }

  updateFormDuration(ids: Array<number>): void {
    const mediaFileDuration = this.mediaFileTable
      .filter(m => ids.indexOf(m.id as number) !== -1)
      .map(m => m.duration)
      .reduce((m, a) => m + a, 0);
    if ((mediaFileDuration > 0) && (mediaFileDuration !== this.editForm.value.duration)) {
      setTimeout(() => {
        this.editForm.patchValue({"duration": mediaFileDuration})
      }, 0)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const trackProp = changes[propName];
        console.log(`changed track ${JSON.stringify(trackProp.currentValue)}`);
      } else if (propName === 'artifactTypeId') {
        const artifactTypeIdProp = changes[propName];
        console.log(`changed artifactTypeId ${JSON.stringify(artifactTypeIdProp.currentValue)}`);

        this.isArtifactTypeMusic = isArtifactTypeMusic(artifactTypeIdProp.currentValue);
        this.isArtifactTypeVideo = isArtifactTypeVideo(artifactTypeIdProp.currentValue);
      }
    }
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  override createSavedItem(): Track {
    console.log(`createSavedItem: dvProductId: ${JSON.stringify(this.editForm.value.dvProductId)}`)
    return {
      id: this.editItem?.id,
      artifact: this.editItem?.artifact as Artifact,
      diskNum: this.artifactTypeConfig?.hasDiskNum ? this.editForm.value.diskNum : null,
      num: this.editForm.value.num,
      artist: {id: this.editForm.value.artistId?.id, artistName: this.editForm.value.artistId?.name} as Artist,
      performerArtist: {id: this.editForm.value.performerArtistId?.id, artistName: this.editForm.value.performerArtistId?.name} as Artist,
      dvType: this.editForm.value.dvTypeId ? {id: this.editForm.value.dvTypeId} as DVType : {},
      title: this.editForm.value.title,
      duration: this.editForm.value.duration,
      mediaFiles: this.editForm.value.mediaFileIds.map((v: number) => {return {id: v} as MediaFile}),
      dvProduct: {id: this.editForm.value.dvProductId?.id} as DVProduct
    } as Track
  }

  searchArtists(event: any): void {
    this.filteredArtists = filterIdName(this.artistsTable, event.query)
  }

  searchPerformerArtists(event: any): void {
    this.filteredPerformerArtists = filterIdName(this.artistsTable, event.query)
  }

  searchDvProducts(event: any): void {
    this.filteredDvProducts = filterIdTitle(this.dvProductsTable, event.query)
  }

  onUpdateDuration(event: any): void {
    event.preventDefault();
    this.updateFormDuration(this.editForm.value.mediaFileIds)
  }
}
