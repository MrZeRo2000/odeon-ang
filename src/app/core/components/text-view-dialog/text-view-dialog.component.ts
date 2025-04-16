import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-text-view-dialog',
    templateUrl: './text-view-dialog.component.html',
    styleUrls: ['./text-view-dialog.component.css'],
    standalone: false
})
export class TextViewDialogComponent {

  @Input()
  display: boolean = false;
  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  @Input()
  header: string = 'Header';

  @Input()
  htmlText: string = ''

  @Input()
  text: string = ''

  @Input()
  dialogPosition: 'center' | 'right' = 'center'

  @Input()
  dialogStyle = {width: '50vw'}

  constructor() { }

}
