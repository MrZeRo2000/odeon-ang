import {Subject} from "rxjs";
import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  template: ``
})
export class BaseFormComponent<T> {

  submitted = false;

  protected saveSubject: Subject<T> = new Subject<T>();

  @Input()
  public display: boolean = false;
  @Output()
  public displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get displayProp() { return this.display; }
  public set displayProp(newValue) {
    this.displayChange.emit(newValue);
  }

  @Input()
  public editItem?: T;

  @Output()
  public onSavedItem: EventEmitter<T> = new EventEmitter();

  constructor() { }

  hideDialog(): void {
    this.submitted = false;
    this.displayProp = false;
  }

  validate(): boolean {
    return true;
  }

  createSavedItem(): T {
    return {} as T
  }

  save() : void {
    this.submitted = true;
    if (this.validate()) {
      this.saveSubject.next(this.createSavedItem());
    }
  }
}
