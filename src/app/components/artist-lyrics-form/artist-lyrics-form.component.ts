import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseFormComponent} from "../base/base-form.component";
import {ArtistLyricsEditItem} from "../../model/artist-lyrics";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistLyricsService} from "../../service/artist-lyrics.service";
import {IdName} from "../../model/common";

@Component({
  selector: 'app-artist-lyrics-form',
  templateUrl: './artist-lyrics-form.component.html',
  styleUrls: ['./artist-lyrics-form.component.scss']
})
export class ArtistLyricsFormComponent extends BaseFormComponent<ArtistLyricsEditItem> implements OnChanges {

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
    private confirmationService: ConfirmationService,
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
    const query = event.query.toLowerCase();
    this.filteredArtists = this.artistTable.filter(v => v.name.toLowerCase().indexOf(query) == 0);
  }
}
