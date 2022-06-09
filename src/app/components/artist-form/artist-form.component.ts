import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtistTableItem} from "../../model/artists";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../base/base.component";
import {map, of, switchMap, takeUntil, tap} from "rxjs";
import {ENTER} from "@angular/cdk/keycodes";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent extends BaseComponent implements OnInit, OnChanges {

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
    biography: [''],
    genre: [''],
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
  artist: ArtistTableItem = {} as ArtistTableItem;

  @Input()
  table: Array<ArtistTableItem> = [];

  genres: Array<String> = [];
  filteredGenres: Array<String> = [];

  styles: Array<String> = [];
  filteredStyles: Array<String> = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
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
          "biography": changedProp.currentValue.biography?? '',
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
    if ((event.keyCode == ENTER) && !!event.target.value) {
      console.log(`Selected ${event.target.value}`);
      const value = event.target.value;

      this.confirmationService.confirm({
        key: "styles",
        target: event.target,
        message: `Are you sure that you want to add ${value }?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          setTimeout(() =>{
            this.filteredStyles.push(value);
            this.editForm.controls["styles"].value.push(value );
            event.target.value = '';
            event.target.focus();
          }, 0);
        }
      });

    }
  }
}
