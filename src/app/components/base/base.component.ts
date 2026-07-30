import {Component, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Subject} from "rxjs";

@Component({
    selector: 'app-base',
    template: ``,
    styleUrls: ['./base.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BaseComponent implements OnDestroy {

  protected destroy$ = new Subject();

  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }
}
