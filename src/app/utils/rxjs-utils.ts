import {BehaviorSubject, Observable, shareReplay, switchMap} from "rxjs";

export class SharedHandler<T> {

  constructor(private sharedFunction: () => Observable<T>) {
  }

  private refreshTable$ = new BehaviorSubject<void>(undefined);

  public refreshTable(): void {
    this.refreshTable$.next(undefined);
  }

  public getSharedObservable(): Observable<T> {
    return this.refreshTable$.pipe(
      switchMap(() => this.sharedFunction()),
      shareReplay(1)
    )
  }
}
