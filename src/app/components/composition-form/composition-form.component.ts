import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CompositionEditItem} from "../../model/composition";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {CompositionService} from "../../service/composition.service";
import {BaseFormComponent} from "../base/base-form.component";
import {IdName} from "../../model/common";
import {ARTIST_TYPES} from "../../model/artists";

@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
  styleUrls: ['./composition-form.component.scss']
})
export class CompositionFormComponent extends BaseFormComponent<CompositionEditItem> implements OnChanges {

  @Input()
  mediaFileTable: IdName[] = [];

  @Input()
  artistsTable: IdName[] = [];

  @Input()
  artistTypeCode: string = 'A';

  filteredArtists: Array<IdName> = [];
  filteredPerformerArtists: Array<IdName> = [];

  editForm = this.fb.group({
    diskNum: ['1', Validators.required],
    num: ['1', Validators.required],
    artistId: [''],
    performerArtistId: [''],
    title: ['', Validators.required],
    duration: [''],
    mediaFileIds: [[]]
  })

  constructor(
    private fb: FormBuilder,
    override messageService: MessageService,
    private compositionService: CompositionService
  ) {
    super(messageService, compositionService)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const compositionProp = changes[propName];
        console.log(`changed composition ${JSON.stringify(compositionProp.currentValue)}`);
        this.editForm.setValue({
          "diskNum": compositionProp.currentValue.diskNum?? '1',
          "num": compositionProp.currentValue.num?? '1',
          "artistId": compositionProp.currentValue.artistId? {id: compositionProp.currentValue.artistId, name: compositionProp.currentValue.artistName} : '',
          "performerArtistId": compositionProp.currentValue.performerArtistId? {id: compositionProp.currentValue.performerArtistId, name: compositionProp.currentValue.performerArtistName} : '',
          "title": compositionProp.currentValue.title?? '',
          "duration": compositionProp.currentValue.duration?? '',
          "mediaFileIds": compositionProp.currentValue.mediaFileIds?? []
        })
      }
    }
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  override createSavedItem(): CompositionEditItem {
    return {
      id: this.editItem?.id,
      artifactId: this.editItem?.artifactId,
      diskNum: this.editForm.value.diskNum,
      num: this.editForm.value.num,
      artistId: this.editForm.value.artistId?.id,
      artistName: this.editForm.value.artistId?.name,
      performerArtistId: this.editForm.value.performerArtistId?.id,
      performerArtistName: this.editForm.value.performerArtistId?.name,
      title: this.editForm.value.title,
      duration: this.editForm.value.duration,
      mediaFileIds: this.editForm.value.mediaFileIds,
    } as CompositionEditItem
  }

  searchArtists(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredArtists = [...this.artistsTable.filter(v => v.name.toLowerCase().indexOf(query) == 0)];
  }

  searchPerformerArtists(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredPerformerArtists = [...this.artistsTable.filter(v => v.name.toLowerCase().indexOf(query) == 0)];
  }
}
