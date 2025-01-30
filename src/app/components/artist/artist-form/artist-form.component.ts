import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Artist, ARTIST_TYPES} from "../../../model/artists";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ENTER} from "@angular/cdk/keycodes";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistService} from "../../../service/artist.service";
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {filterString} from "../../../utils/search-utils";

@Component({
    selector: 'app-artist-form',
    templateUrl: './artist-form.component.html',
    styleUrls: ['./artist-form.component.scss'],
    standalone: false
})
export class ArtistFormComponent extends BaseCrudFormComponent<Artist> implements OnInit {
  @ViewChild('autofocused', { static: false}) autoFocused?: ElementRef;

  artistTypes =  ARTIST_TYPES;

  editForm: FormGroup = this.fb.group({
    artistName: ['', Validators.required],
    artistType: [ARTIST_TYPES[0].code],
    biography: [''],
    genre: ['', Validators.required],
    styles: [[]]
  })

  displayBiography = false;

  @Input()
  artistTable: Array<Artist> = [];

  genres: Array<string> = [];
  filteredGenres: Array<string> = [];

  styles: Array<string> = [];
  filteredStyles: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    messageService: MessageService,
    artistService: ArtistService
  ) {
    super(messageService, artistService);
  }

  ngOnInit(): void {
    this.editForm.setValue({
      artistName: this.editItem?.artistName?? '',
      artistType: ARTIST_TYPES.filter(v => v.code === this.editItem?.artistType)[0]?.code || ARTIST_TYPES[0].code,
      biography: this.editItem?.artistBiography?? '',
      genre: this.editItem?.genre?? '',
      styles: this.editItem?.styles?? []
    })
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.nativeElement?.focus();
    }, 200)
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  override createSavedItem(): Artist {
    return {
      id: this.editItem?.id,
      artistName: this.editForm.value.artistName,
      artistType: this.editForm.value.artistType,
      artistBiography: this.editForm.value.biography || undefined,
      genre: this.editForm.value.genre,
      styles: this.editForm.value.styles
    } as Artist
  }

  previewBiography(): void {
    if (!!this.editForm.value.biography) {
      this.displayBiography = true;
    }
  }

  searchGenres(event: any): void {
    if (this.genres.length == 0) {
      this.genres = [... new Set(this.artistTable.map(v => v.genre || "").filter(v => !!v))].sort();
    }

    this.filteredGenres = filterString(this.genres, event.query)
  }

  searchStyles(event: any): void {
    if (this.styles.length == 0) {
      this.styles = [... new Set(this.artistTable.flatMap(v => v.styles || []).filter(v => !!v))].sort();
    }

    this.filteredStyles = filterString(this.styles, event.query);
  }

  stylesKeyUp(event: any): void {
    if (
      (event.keyCode == ENTER) &&
      !!event.target.value &&
      this.editForm.value.styles.indexOf(event.target.value) === -1
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
          this.editForm.value.styles.push(value);
          event.target.value = '';
          event.target.focus();
        }
      });
    }
  }
}
