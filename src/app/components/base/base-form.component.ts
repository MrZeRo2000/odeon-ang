import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from "@angular/core";

@Component({
    template: ``,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class BaseFormComponent {

  submitted = false;

  @Input()
  public display: boolean = false;
  @Output()
  public displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  hideDialog(): void {
    this.submitted = false;
    this.displayProp = false;
  }

  validate(): boolean {
    return true;
  }
}
