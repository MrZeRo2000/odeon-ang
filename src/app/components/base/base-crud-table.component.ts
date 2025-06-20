import {catchError, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {CRUDService} from "../../service/crud.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {BaseTableComponent} from "./base-table-component";

export interface BaseTableConfig {
  deleteConfirmation: (v: any) => string,
  deleteErrorMessage: (v: any) => string,
  editErrorMessage: (v: any) => string
}

export abstract class BaseCrudTableComponent<T extends {id?: number}, E> extends BaseTableComponent<T>{
  CRUDAction = CRUDAction;

  displayForm = false;

  protected deleteSubject: Subject<CRUDOperation<T>> = new Subject<CRUDOperation<T>>();

  deleteAction$ = this.deleteSubject.asObservable().pipe(
    switchMap(v =>
      this.delete(v.data.id as number)
    ),
    tap(v => {
      if (v?.success) {
        this.loadData();
      } else if (!!v) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.config.deleteErrorMessage(v)
        });
      }
    })
  );

  protected editSubject: Subject<T> = new Subject();

  editAction$ = this.editSubject.asObservable().pipe(
    switchMap(v =>
      this.getEditData(v)
    ),
    tap(v => {
      if (v.success) {
        this.displayForm = v.success
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.config.editErrorMessage(v)
        });
      }
    }),
    map(v => v.data as E)
  );

  protected tagsSubject: Subject<T> = new Subject();

  protected constructor(
    messagesService: MessageService,
    protected confirmationService: ConfirmationService,
    protected dataService: CRUDService<any>,
    protected config: BaseTableConfig
  ) { super(messagesService); }

  protected abstract getEditData(item: T): Observable<CRUDResult<E>>;

  savedEditData(event: any): void {
    this.displayForm = false;
    this.loadData();
  }

  protected delete(id: number): Observable<CRUDResult<void>> {
    return this.dataService.delete(id).pipe(
      map(_ => {return {success: true} as CRUDResult<void>}),
      catchError(err => {
        console.log(`Error:${JSON.stringify(err)}`)
        return of({success: false, data: err.error?.message || err.message})
      })
    )
  }

  protected get(id: number): Observable<CRUDResult<E>> {
    return this.dataService.get(id).pipe(
      map(v => {return {success: true, data: v}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
  }

  crudEvent(event: any): void {
    if (event.action === CRUDAction.EA_DELETE) {
      this.confirmationService.confirm({
        message: this.config.deleteConfirmation(event),
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteSubject.next({action: event.action, data: event.data})
        }
      });
    } else if (event.action === CRUDAction.EA_CREATE) {
      this.editSubject.next({} as T)
    } else if (event.action === CRUDAction.EA_UPDATE) {
      this.editSubject.next(event.data)
    }
  }
}
