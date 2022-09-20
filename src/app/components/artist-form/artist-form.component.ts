import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtistEditItem, ArtistTableItem, ARTIST_TYPES} from "../../model/artists";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ENTER} from "@angular/cdk/keycodes";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistService} from "../../service/artist.service";
import {BaseFormComponent} from "../base/base-form.component";

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent extends BaseFormComponent<ArtistEditItem> implements OnChanges {
  artistTypes =  ARTIST_TYPES;

  editForm = this.fb.group({
    artistName: ['', Validators.required],
    artistType: [ARTIST_TYPES[0].code],
    biography: [''],
    genre: ['', Validators.required],
    styles: [[]]
  })

  displayBiography = false;

  @Input()
  artistTable: Array<ArtistTableItem> = [];

  genres: Array<String> = [];
  filteredGenres: Array<String> = [];

  styles: Array<String> = [];
  filteredStyles: Array<String> = [];

  constructor(
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    messageService: MessageService,
    artistService: ArtistService
  ) {
    super(messageService, artistService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'editItem') {
        const changedProp = changes[propName];
        console.log(`changed artist ${JSON.stringify(changedProp.currentValue)}`);
        this.editForm.setValue({
          "artistName": changedProp.currentValue.artistName?? '',
          "artistType": ARTIST_TYPES.filter(v => v.code === changedProp.currentValue.artistType)[0]?.code || ARTIST_TYPES[0].code,
          "biography": changedProp.currentValue.artistBiography?? '',
          "genre": changedProp.currentValue.genre?? '',
          "styles": changedProp.currentValue.styles?? [],
        })
      }
    }
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  override createSavedItem(): ArtistEditItem {
    return {
      id: this.editItem?.id,
      artistName: this.editForm.value.artistName,
      artistType: this.editForm.value.artistType,
      artistBiography: this.editForm.value.biography || undefined,
      genre: this.editForm.value.genre,
      styles: this.editForm.value.styles
    }
  }

  previewBiography(): void {
    if (!!this.editForm.value.biography) {
      this.displayBiography = true;
    }
  }

  searchGenres(event: any): void {
    const query = event.query.toLowerCase();
    if (this.genres.length == 0) {
      this.genres = [... new Set(this.artistTable.map(v => v.genre || "").filter(v => !!v))].sort();
    }

    this.filteredGenres = this.genres.filter(v => v.toLowerCase().indexOf(query) == 0);
  }

  searchStyles(event: any): void {
    const query = event.query.toLowerCase();
    if (this.styles.length == 0) {
      this.styles = [... new Set(this.artistTable.flatMap(v => v.styles || []).filter(v => !!v))].sort();
    }

    this.filteredStyles = this.styles.filter(v => v.toLowerCase().indexOf(query) == 0);
  }

  stylesKeyUp(event: any): void {
    if (
      (event.keyCode == ENTER) &&
      !!event.target.value &&
      this.editForm.controls["styles"].value?.indexOf(event.target.value) === -1
    ) {
      console.log(`Selected ${event.target.value}`);
      const value = event.target.value;

      this.confirmationService.confirm({
        key: "styles",
        target: event.target,
        message: `Are you sure that you want to add ${value }?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.filteredStyles.push(value);
          this.editForm.controls["styles"].value.push(value );
          event.target.value = '';
          event.target.focus();
        }
      });
    }
  }
}
