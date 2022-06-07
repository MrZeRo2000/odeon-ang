import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistTableItem} from "../../model/artists";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../base/base.component";
import {map, of, switchMap, takeUntil, tap} from "rxjs";
import {ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent extends BaseComponent implements OnInit {

  @Input()
  display: boolean = false;
  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  /*
  editForm =  new FormGroup ({
    artistName: new FormControl('')
  });

   */

  editForm = this.fb.group({
    artistName: ['', Validators.required],
    biography: [''],
    genre: [''],
    styles: ['']
  })

  editFormChanges$ = this.editForm.valueChanges.pipe(
    tap(v => {
      console.log(`From tap: ${JSON.stringify(v)}`);
      this.submitted = false;
    })
  );

  submitted = false;

  @Input()
  artist: ArtistTableItem = {} as ArtistTableItem;

  @Input()
  table: Array<ArtistTableItem> = [];

  genres: Array<String> = [];
  filteredGenres: Array<String> = [];

  styles: Array<String> = [];
  filteredStyles: Array<String> = [];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

  hideDialog(): void {
    this.displayProp = false;
  }

  saveArtist(): void {
    this.submitted = true;
  }

  searchGenres(event: any): void {
    const query = event.query.toLowerCase();
    if (this.genres.length == 0) {
      this.genres = [... new Set(this.table.map(v => v.genre || "").filter(v => !!v))].sort();
    }

    this.filteredGenres = this.genres.filter(v => v.toLowerCase().indexOf(query) == 0)

  }

  searchStyles(event: any): void {
    const query = event.query.toLowerCase();
    if (this.styles.length == 0) {
      this.styles = [... new Set(this.table.flatMap(v => v.styles || []).filter(v => !!v))].sort();
    }

    this.filteredStyles = this.styles.filter(v => v.toLowerCase().indexOf(query) == 0)

  }

  stylesKeyUp(event: any): void {
    if (event.keyCode == ENTER) {
      console.log(`Selected ${event.target.value}`);
      this.filteredStyles.push(event.target.value);
      this.editForm.controls["styles"].value.push(event.target.value);
      event.target.value = '';
    }
  }


}
