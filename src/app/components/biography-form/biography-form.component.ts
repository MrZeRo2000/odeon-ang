import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-biography-form',
  templateUrl: './biography-form.component.html',
  styleUrls: ['./biography-form.component.scss']
})
export class BiographyFormComponent implements OnInit {

  @Input()
  display: boolean = false;
  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  @Input()
  header: string = 'Biography';

  @Input()
  biography: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
