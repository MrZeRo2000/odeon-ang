import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CRUDService} from "../../service/crud.service";
import {MessageService} from "primeng/api";

@Component({
  template: ``
})
export abstract class BaseFormComponent<T extends { id?: number}> {

  submitted = false;

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

  protected saveSubject: Subject<T> = new Subject<T>();

  saveAction$ = this.saveSubject.asObservable().pipe(
    switchMap(data => {
      const action$ = data.id ? this.crudService.update(data) : this.crudService.create(data);
      const actionName = data.id ? 'updating' : 'creating';
      return action$.pipe(
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error ${actionName}: ${err.error?.message || err.message}`
          });
          return of(undefined);
        })
      );
    }),
    tap(v => {
      if (!!v) {
        this.onSavedItem.emit(v);
      }
    })
  );

  protected constructor(
    protected messageService: MessageService,
    protected crudService: CRUDService<T>,
  ) { }

  hideDialog(): void {
    this.submitted = false;
    this.displayProp = false;
  }

  validate(): boolean {
    return true;
  }

  abstract createSavedItem(): T;

  save() : void {
    this.submitted = true;
    if (this.validate()) {
      this.saveSubject.next(this.createSavedItem());
    }
  }
}
