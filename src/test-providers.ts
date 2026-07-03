import { provideZonelessChangeDetection } from '@angular/core';

// Providers applied to the TestBed environment for every spec.
// Zoneless change detection replaces the previous Zone.js-based setup.
export default [
  provideZonelessChangeDetection(),
];
