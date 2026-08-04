# Angular pinned to 22.0.x — do not bump to 22.1.x without re-verifying this

`package.json` pins all `@angular/*` packages to an exact `22.0.x` version
(`22.0.8`, except `@angular/cdk` at `22.0.7` — its latest 22.0.x release) instead of
`^22.1.0`. This is deliberate. **Do not `npm update`/bump these to `22.1.x` or later
without re-testing the MultiSelect column filters** (see below) — a caret range like
`^22.0.8` would happily resolve to `22.1.0` again and silently reintroduce this bug.

## The bug

Angular 22.1.0 has a compiler regression that breaks every `p-multi-select` in this
app the moment its dropdown panel renders at least one option. Symptom:

```
ERROR ReferenceError: scrollerOptions_r16 is not defined
    at MultiSelect._forTrack0 (primeng-multiselect.mjs:...)
```

PrimeNG's `MultiSelect` template has an internal option-list `@for` loop whose
`track` expression reads a `scrollerOptions` variable bound via an enclosing
`<ng-template let-scrollerOptions="options">`, invoked through `*ngTemplateOutlet`.
Angular hoists `@for` track expressions into standalone, module-level functions.

- **On Angular 22.1.0** (broken): the compiler fails to thread `scrollerOptions`
  through that hoisted function at all — the compiled output is a bare, unbound
  reference: `this.getOptionIndex(t, scrollerOptions_r16)`. Confirmed present in
  both `ng build --configuration development` and a full, minified production
  build (Terser leaving `scrollerOptions_r16` unrenamed is itself evidence it's an
  unresolvable identifier, not a real local — minifiers don't rename globals).
- **On Angular 22.0.8** (correct): the exact same PrimeNG template compiles to
  `this.getOptionIndex(t, this.scrollerOptions)` — a proper `this`-bound property
  access.

Same PrimeNG version (`22.0.0`) in both cases — only the Angular compiler version
differs. This lines up with Angular's own changelog: `22.1.0` shipped compiler
changes for "support foreign components inside control flow blocks (#69674)",
which is exactly the shape of this bug (a `@for` control-flow block inside a
third-party library's template, i.e. a "foreign component" from the app's
compilation unit).

This is **not a PrimeNG bug** and not something in our app code — it's an Angular
compiler defect, verified by direct inspection of the compiled bundle on both
versions, not just by build success/failure (both versions compile without error;
only the runtime behavior differs).

## If you need to move past 22.0.x later

1. Check the Angular changelog for `22.1.x`/`22.2.x` for any further compiler fixes
   to control-flow/track-function/`ngTemplateOutlet` handling.
2. Bump the pin, `npm install`, `ng build`, then grep the built bundle for
   `getOptionIndex(` — confirm it reads `this.getOptionIndex(x, this.scrollerOptions)`,
   not a bare `scrollerOptions_rNN` identifier.
3. Actually open a `p-multi-select` column filter (e.g. Artists table → Artist Name
   filter) in a running app and check the browser console before trusting it.
