import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtistEditItem, ArtistTableItem, ARTIST_TYPES} from "../../model/artists";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../base/base.component";
import {catchError, map, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {ENTER} from "@angular/cdk/keycodes";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistService} from "../../service/artist.service";

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent extends BaseComponent implements OnInit, OnChanges {
  artistTypes =  ARTIST_TYPES;

  @Input()
  display: boolean = false;
  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  editForm = this.fb.group({
    artistName: ['', Validators.required],
    artistType: [ARTIST_TYPES[0].code],
    biography: [''],
    genre: ['', Validators.required],
    styles: [[]]
  })

  editFormChanges$ = this.editForm.valueChanges.pipe(
    tap(v => {
      console.log(`From tap: ${JSON.stringify(v)}`);
      this.submitted = false;
    })
  );

  submitted = false;

  displayBiography = false;

  @Input()
  artist: ArtistEditItem = {} as ArtistEditItem;

  @Input()
  table: Array<ArtistTableItem> = [];

  @Output()
  saveArtistEvent: EventEmitter<ArtistEditItem> = new EventEmitter();

  genres: Array<String> = [];
  filteredGenres: Array<String> = [];

  styles: Array<String> = [];
  filteredStyles: Array<String> = [];

  private saveAction: Subject<ArtistEditItem> = new Subject<ArtistEditItem>();

  saver$ = this.saveAction.pipe(
    switchMap(data => {
      return this.artistService.createArtist(data).pipe(
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error creating artist: ${err.error?.message || err.message}`
          });
          return of(undefined);
        })
      );
    }),
    tap(v => {
      if (!!v) {
        this.saveArtistEvent.emit(v);
      }
    })
  )

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private artistService: ArtistService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName == 'artist') {
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

  hideDialog(): void {
    this.submitted = false;
    this.displayProp = false;
  }

  saveArtist(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      const artistEditItem: ArtistEditItem = {
        id: this.artist?.id,
        artistName: this.editForm.value.artistName,
        artistType: this.editForm.value.artistType,
        artistBiography: this.editForm.value.biography || undefined,
        genre: this.editForm.value.genre,
        styles: this.editForm.value.styles
      };
      this.saveAction.next(artistEditItem);
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
      this.genres = [... new Set(this.table.map(v => v.genre || "").filter(v => !!v))].sort();
    }

    this.filteredGenres = this.genres.filter(v => v.toLowerCase().indexOf(query) == 0);
  }

  searchStyles(event: any): void {
    const query = event.query.toLowerCase();
    if (this.styles.length == 0) {
      this.styles = [... new Set(this.table.flatMap(v => v.styles || []).filter(v => !!v))].sort();
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
