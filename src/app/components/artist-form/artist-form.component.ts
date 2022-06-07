import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistTableItem} from "../../model/artists";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../base/base.component";
import {map, of, switchMap, takeUntil, tap} from "rxjs";

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
    biography: ['']
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

}
