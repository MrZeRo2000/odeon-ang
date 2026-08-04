# p-multi-select → p-select migration — reverted

PrimeNG's type declarations mark `MultiSelect` (`p-multiselect` / `p-multi-select`) as
`@deprecated Use Select component with multiple property instead`, which is what motivated this
migration in the first place. All 16 non-chip usages across the app were converted to
`p-select [multiple]="true"`, and 3 chip-display usages (`display="chip"`) were deliberately left
on `p-multi-select` since `p-select`'s `multiple` mode has no chip/token rendering (see below).

**This migration has been reverted in full (all 19 usages back to `p-multi-select`).** Reason:
PrimeNG's own official demo at https://primeng.dev/table#filter-advanced — the reference
implementation for exactly this "table column filter" pattern — still uses `p-multiSelect`
inside `p-columnFilter`, checkboxes and all. The `@deprecated` tag in the type declarations
doesn't match what PrimeNG's own docs actually recommend for this use case, so matching the
official demo's look took priority over following the deprecation notice literally.

## Current state (as of the revert)

All 19 usages are back on `p-multi-select`/`p-multiselect`, including the 3 form-only pickers
that were never filters (`artistIds` in `tracks-all-table`/`artifacts-all-table`,
`mediaFileIds` in `track-form`) — reverted along with the filter ones rather than left half
converted.

- `artist.module.ts` — `MultiSelectModule` restored, the `SelectModule` import added during the
  migration was removed again (no other `p-select` usage exists in this module).
- `track.module.ts` — `MultiSelectModule` restored. `SelectModule` stays imported — it's used by
  unrelated pre-existing single-selects (`tracks-update-selected-video-types-form`,
  `tracks-update-durations-form`, `tracks-import-form`).
- `artifact.module.ts` and `d-v.module.ts` — untouched throughout; both already had
  `MultiSelectModule` and `SelectModule` imported before this migration ever started (the latter
  used by pre-existing unrelated single-selects, e.g. in `dvproducts-import-form`/
  `dvproduct-form`).
- `media-file.module.ts` — still has an unused `MultiSelectModule` import; that's pre-existing
  dead code from before this migration, unrelated to it, left alone.

## If this is revisited again

The chip-rendering constraint documented below is still accurate and would still apply if
`p-select` migration is attempted again:

**Why chip usages can't move to `p-select` as-is:** `p-select`'s `multiple` mode has no
chip/token rendering. Its `selectedItemTemplate` content-child hook binds to an internal
`selectedOption` signal that only gets populated for single-select matches (via
`findSelectedOptionIndex`) — in `multiple` mode it stays `null`, so the hook always falls back to
the plain label. There is no per-item repeated slot like `MultiSelect`'s chip tokens
(`chipIcon`, `removeTokenIcon`, etc.). The built-in multi-value label is just the selected labels
joined with `", "`. Recreating chips would require a custom `<ng-template #selectedItem>` that
ignores that (always-null) context and manually loops over the bound form value + options array.

Build + all 55/80 Vitest files/tests pass after the revert.
