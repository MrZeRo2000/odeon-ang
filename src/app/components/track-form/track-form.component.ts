import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {getTrackConfig, TrackConfigItem, TrackEditItem} from "../../model/track";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {TrackService} from "../../service/track.service";
import {BaseCrudFormComponent} from "../base/base-crud-form.component";
import {IdName, IdTitle} from "../../model/common";
import {
  isArtifactTypeMusic,
  isArtifactTypeVideo
} from "../../model/artifacts";
import {DV_TYPES} from "../../model/dvtype";
import {filterIdName, filterIdTitle} from "../../utils/search-utils";

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss'],
})
export class TrackFormComponent extends BaseCrudFormComponent<TrackEditItem> implements OnChanges, OnInit {
  DV_TYPES = DV_TYPES;

  @Input()
  mediaFileTable: IdName[] = [];

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

    this.editForm = this.fb.group({
      artistId: this.editItem?.artistId? {id: this.editItem.artistId, name: this.editItem.artistName} : '',
      performerArtistId: this.editItem?.performerArtistId? {id: this.editItem.performerArtistId, name: this.editItem.performerArtistName} : '',
      dvTypeId: ['', this.artifactTypeConfig?.hasDvType? Validators.required : null],
      title: ['', Validators.required],
      duration: [''],
      diskNum: ['', this.artifactTypeConfig?.hasDiskNum? Validators.required : null],
      num: ['1', Validators.required],
      mediaFileIds: [[]],
      dvProductId: [''],
    });

    // common values without defaults
    this.editForm.setValue({
      "artistId": this.editItem?.artistId? {id: this.editItem.artistId, name: this.editItem.artistName} : '',
      "performerArtistId": this.editItem?.performerArtistId? {id: this.editItem.performerArtistId, name: this.editItem.performerArtistName} : '',
      "dvTypeId": '',
      "title": this.editItem?.title?? '',
      "duration": this.editItem?.duration?? '',
      "diskNum": '',
      "num": this.editItem?.num?? '1',
      "mediaFileIds": this.editItem?.mediaFileIds?? [],
      "dvProductId": this.editItem?.dvProductId? {id: this.editItem.dvProductId, title: this.editItem.dvProductTitle} : '',
    });

    // default values
    if (this.artifactTypeConfig?.hasDiskNum) {
      this.editForm.patchValue({"diskNum": this.editItem?.diskNum?? '1'});
    }

    if (this.artifactTypeConfig?.hasDvType) {
      this.editForm.patchValue({"dvTypeId": this.editItem?.dvTypeId?? 8});
    }

    /*

    if (this.isArtifactTypeMusic) {
      console.log('isArtifactTypeMusic');
      this.editForm = this.fb.group({
        diskNum: ['', Validators.required],
        num: ['1', Validators.required],
        artistId: [''],
        performerArtistId: [''],
        title: ['', Validators.required],
        duration: [''],
        mediaFileIds: [[]]
      });

      this.editForm.setValue({
        "diskNum": this.editItem?.diskNum?? '1',
        "num": this.editItem?.num?? '1',
        "artistId": this.editItem?.artistId? {id: this.editItem.artistId, name: this.editItem.artistName} : '',
        "performerArtistId": this.editItem?.performerArtistId? {id: this.editItem.performerArtistId, name: this.editItem.performerArtistName} : '',
        "title": this.editItem?.title?? '',
        "duration": this.editItem?.duration?? '',
        "mediaFileIds": this.editItem?.mediaFileIds?? [],
      });

    } else if (this.isArtifactTypeVideo) {
      console.log('isArtifactTypeVideo');
      this.editForm = this.fb.group({
        num: ['1', Validators.required],
        artistId: [''],
        dvTypeId: ['', Validators.required],
        title: ['', Validators.required],
        duration: [''],
        mediaFileIds: [[]],
        dvProductId: ['']
      });

      this.editForm.setValue({
        "num": this.editItem?.num?? '1',
        "artistId": this.editItem?.artistId? {id: this.editItem.artistId, name: this.editItem.artistName} : '',
        "dvTypeId": this.editItem?.dvTypeId?? 8,
        "title": this.editItem?.title?? '',
        "duration": this.editItem?.duration?? '',
        "mediaFileIds": this.editItem?.mediaFileIds?? [],
        "dvProductId": this.editItem?.dvProductId? {id: this.editItem.dvProductId, title: this.editItem.dvProductTitle} : '',
      });
    }

     */
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const trackProp = changes[propName];
        console.log(`changed track ${JSON.stringify(trackProp.currentValue)}`);
/*
        this.editForm.setValue({
          "diskNum": trackProp.currentValue.diskNum?? '1',
          "num": trackProp.currentValue.num?? '1',
          "artistId": trackProp.currentValue.artistId? {id: trackProp.currentValue.artistId, name: trackProp.currentValue.artistName} : '',
          "performerArtistId": trackProp.currentValue.performerArtistId? {id: trackProp.currentValue.performerArtistId, name: trackProp.currentValue.performerArtistName} : '',
          "title": trackProp.currentValue.title?? '',
          "duration": trackProp.currentValue.duration?? '',
          "mediaFileIds": trackProp.currentValue.mediaFileIds?? []
        })

 */
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

  override createSavedItem(): TrackEditItem {
    console.log(`createSavedItem: dvProductId: ${JSON.stringify(this.editForm.value.dvProductId)}`)
    return {
      id: this.editItem?.id,
      artifactId: this.editItem?.artifactId,
      diskNum: this.editForm.value.diskNum,
      num: this.editForm.value.num,
      artistId: this.editForm.value.artistId?.id,
      artistName: this.editForm.value.artistId?.name,
      performerArtistId: this.editForm.value.performerArtistId?.id,
      performerArtistName: this.editForm.value.performerArtistId?.name,
      dvTypeId: this.editForm.value.dvTypeId,
      title: this.editForm.value.title,
      duration: this.editForm.value.duration,
      mediaFileIds: this.editForm.value.mediaFileIds,
      dvProductId: this.editForm.value.dvProductId?.id
    } as TrackEditItem
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
}
