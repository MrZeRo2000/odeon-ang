import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {ArtistLyricsEditItem} from "../../../model/artist-lyrics";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ArtistLyricsService} from "../../../service/artist-lyrics.service";
import {IdName} from "../../../model/common";
import {filterIdName} from "../../../utils/search-utils";

@Component({
    selector: 'app-artist-lyrics-form',
    templateUrl: './artist-lyrics-form.component.html',
    styleUrls: ['./artist-lyrics-form.component.css'],
    standalone: false
})
export class ArtistLyricsFormComponent extends BaseCrudFormComponent<ArtistLyricsEditItem> implements OnChanges {
  @ViewChild('autofocused', { static: false}) autoFocused!: any;

  @Input()
  artistTable: IdName[] = [];

  filteredArtists: Array<IdName> = [];

  editForm = this.fb.group({
    artistId: ['', Validators.required],
    title: ['', Validators.required],
    text: ['', Validators.required]
  })

  constructor(
    private fb: UntypedFormBuilder,
    override messageService: MessageService,
    protected artistLyricsService: ArtistLyricsService
  ) {
    super(messageService, artistLyricsService)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const artistLyricsProp = changes[propName];
        console.log(`changed lyrics ${JSON.stringify(artistLyricsProp.currentValue)}`);
        this.editForm.setValue({
          "artistId": artistLyricsProp.currentValue.artistId? {id: artistLyricsProp.currentValue.artistId, name: artistLyricsProp.currentValue.artistName} : '',
          "title": artistLyricsProp.currentValue.title?? '',
          "text": artistLyricsProp.currentValue.text?? ''
        })
      }
    }
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.el.nativeElement.querySelector('input').focus();
    }, 200)
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  override createSavedItem(): ArtistLyricsEditItem {
    return {
      id: this.editItem?.id,
      artistId: this.editForm.value.artistId.id,
      title: this.editForm.value.title,
      text: this.editForm.value.text
    };
  }

  searchArtists(event: any): void {
    this.filteredArtists = filterIdName(this.artistTable, event.query)
  }
}
