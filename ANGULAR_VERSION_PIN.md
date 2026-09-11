# Angular on ^22.1.6 — history of a compiler regression that hit MultiSelect

`package.json` uses a normal caret range (`^22.1.6`) for all `@angular/*` packages.
It was pinned to an exact version for a while (first `22.0.8`, then briefly
`22.1.6`) to guard against a compiler regression — see below. The exact pin has
since been released: `^22.1.6` has a floor *above* every broken version
(`22.1.0`–`22.1.4`), so a normal `npm install` can no longer resolve back into the
regression range — it can only move forward to `22.1.7`+ or, on a major version
bump, to a version nobody has re-verified yet. Re-run the check in
["How to check"](#how-to-check) before any such bump, especially a major one.

## The bug (present in Angular 22.1.0, fixed by 22.1.5+)

Angular 22.1.0 shipped a compiler regression that broke every `p-multi-select` in
this app the moment its dropdown panel rendered at least one option. Symptom:

```
ERROR ReferenceError: scrollerOptions_r16 is not defined
    at MultiSelect._forTrack0 (primeng-multiselect.mjs:...)
```

PrimeNG's `MultiSelect` template has an internal option-list `@for` loop whose
`track` expression reads a `scrollerOptions` variable bound via an enclosing
`<ng-template let-scrollerOptions="options">`, invoked through `*ngTemplateOutlet`.
Angular hoists `@for` track expressions into standalone, module-level functions.

- **On Angular 22.1.0** (broken): the compiler failed to thread `scrollerOptions`
  through that hoisted function at all — the compiled output was a bare, unbound
  reference: `this.getOptionIndex(t, scrollerOptions_r16)`.
- **On Angular 22.0.8** (correct, pre-regression): the exact same PrimeNG template
  compiled to `this.getOptionIndex(t, this.scrollerOptions)` — a proper `this`-bound
  property access.

Same PrimeNG version (`22.0.0`) in both cases — only the Angular compiler version
differed. This lined up with Angular's own changelog: `22.1.0` shipped compiler
changes for "support foreign components inside control flow blocks (#69674)", which
is exactly the shape of this bug (a `@for` control-flow block inside a third-party
library's template, i.e. a "foreign component" from the app's compilation unit).

This was **not a PrimeNG bug** and not something in our app code — it was an Angular
compiler defect. The project was pinned to an exact `22.0.8` (`@angular/cdk` at
`22.0.7`, its latest matching `22.0.x` release) from 2026-08-04 until the fix below,
then briefly to an exact `22.1.6` before switching to `^22.1.6` once the fix was
confirmed.

## The fix

Angular core PR [#70388](https://github.com/angular/angular/pull/70388)
*"refactor(core): defer foreign component rendering to post-update pass"* changed
exactly the rendering path implicated in this bug — foreign components (like
PrimeNG's) rendered inside control-flow blocks. It merged into the `22.1.x` branch
on 2026-08-28, landing in **22.1.5** (2026-09-02) and present in **22.1.6**
(2026-09-09), the floor of this project's current `^22.1.6` range. Verified
directly (see below) — not just inferred from the PR description.

## How to reproduce (if you ever need to confirm the bug on an old version)

1. Temporarily set all `@angular/*` packages in `package.json` to an exact `22.1.0`
   (or any version between `22.1.0` and `22.1.4` inclusive).
2. `npm install && npm start`, then open the Artists table and click the filter
   icon on the **Genre** column header to open its `p-multi-select` panel.
3. Check the browser console: `ReferenceError: scrollerOptions_r16 is not defined`
   (or a similarly-numbered `scrollerOptions_rNN`) confirms the regression.
4. Revert `package.json` back to `^22.1.6` afterward.

## How to check (before a major-version bump)

A caret range can't drift back into `22.1.0`–`22.1.4` on its own, but always
re-verify before taking a new Angular major version:

1. Check the Angular changelog for the target version for further compiler fixes
   touching control-flow/track-function/`ngTemplateOutlet`/foreign-component
   handling, and check https://github.com/angular/angular/pull/70388 for any
   follow-up regressions reported against it.
2. `npm install`, `npm run build`, then grep the built bundle:
   ```
   grep -o 'getOptionIndex([^;]\{0,80\}' dist/odeon-ang/browser/main-*.js
   grep -c 'scrollerOptions_r' dist/odeon-ang/browser/main-*.js
   ```
   Confirm every `getOptionIndex(` call is scoped through a resolved local (e.g.
   `let r=s().options` a few tokens earlier), and that the `scrollerOptions_r` grep
   returns `0`. A bare `scrollerOptions_rNN` identifier with no `let`-bound
   definition in scope means the regression is back.
3. Run the automated regression guard: `npx playwright test multiselect-filter`
   (see [e2e/multiselect-filter.spec.ts](e2e/multiselect-filter.spec.ts)) — it opens
   the Genre column's `p-multi-select` panel and fails if any console/page error is
   emitted. This is the same check as step 2, automated, and it also runs as part of
   the full `npm run e2e` suite.
4. As a manual sanity check, actually open a `p-multi-select` column filter (e.g.
   Artists table → Genre or Styles column) in a running app and watch the browser
   console before trusting any of the above.
