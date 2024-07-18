import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PreLoaderService {
  private selector = 'globalLoader';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private getElement() {
    return this.document.getElementById(this.selector);
  }

  hide() {
    const el = this.getElement();
    if (el) {
      el.remove()
    }
  }
}
