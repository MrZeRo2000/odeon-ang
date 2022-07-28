import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistLyricsText} from "../../model/artist-lyrics";

@Component({
  selector: 'app-lyrics-text-form',
  templateUrl: './lyrics-text-form.component.html',
  styleUrls: ['./lyrics-text-form.component.scss']
})
export class LyricsTextFormComponent implements OnInit {

  @Input()
  display: boolean = false;
  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  @Input()
  lyrics: ArtistLyricsText = {} as ArtistLyricsText;

  constructor() { }

  ngOnInit(): void {
  }

}
