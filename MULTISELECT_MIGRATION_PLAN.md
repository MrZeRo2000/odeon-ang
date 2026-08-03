# p-multi-select → p-select migration

PrimeNG deprecated `MultiSelect` (`p-multiselect` / `p-multi-select`) in favor of `Select`
(`p-select`) with `[multiple]="true"`.

## Status: 15 of 19 usages migrated

Done — converted to `p-select [multiple]="true"`, `MultiSelectModule` swapped for `SelectModule`
where no longer needed:

- `src/app/components/artist/artists-table/artists-table.component.html` — genre, styles filters
- `src/app/components/track/tracks-all-table/tracks-all-table.component.html` — artistIds form select, artist name filter, tags filter
- `src/app/components/track/track-form/track-form.component.html` — mediaFileIds
- `src/app/components/artifact/artifacts-video-table/artifacts-video-table.component.html` — artist name filter, tags filter
- `src/app/components/artifact/artifacts-table/artifacts-table.component.html` — artist name filter, tags filter (the `artifactTypes` chip select on this page was left, see below)
- `src/app/components/artifact/artifacts-all-table/artifacts-all-table.component.html` — artistIds form select, artist name filter, tags filter
- `src/app/components/dv/dvproducts-table/dvproducts-table.component.html` — origin, category filters

`artist.module.ts` gained a `SelectModule` import. `track.module.ts` had its now-unused
`MultiSelectModule` import removed. `artifact.module.ts` and `d-v.module.ts` keep both
`MultiSelectModule` and `SelectModule` because of the remaining chip usages below.

## Remaining: 4 usages left on `p-multi-select`, deliberately not migrated

All four use `display="chip"` to render selected values as chip tokens:

- `src/app/components/artifact/artifacts-table/artifacts-table.component.html` — `artifactTypes` form filter
- `src/app/components/artist/artist-lyrics-table/artist-lyrics-table.component.html` — `artistName` column filter
- `src/app/components/dv/dvproducts-import-form/dvproducts-import-form.component.html` — `dvCategories`
- `src/app/components/dv/dvproduct-form/dvproduct-form.component.html` — `dvCategories`

**Why they're stuck:** PrimeNG's new `Select` component has no chip/token rendering for
`multiple` mode. Its `selectedItemTemplate` content-child hook binds to an internal
`selectedOption` signal that only gets populated for single-select matches (via
`findSelectedOptionIndex`) — in `multiple` mode it stays `null`, so the hook always falls back
to the plain label. There is no per-item repeated slot like `MultiSelect`'s chip tokens
(`chipIcon`, `removeTokenIcon`, etc.). The built-in multi-value label is just the selected
labels joined with `", "`.

## Options to finish this later

1. **Accept the plain label.** Drop `display="chip"`, convert to `p-select [multiple]="true"`
   like the rest. Selected values show as `"Rock, Pop, Jazz"` instead of chip pills. Zero extra
   code, matches PrimeNG's own migration guidance literally.
2. **Recreate chips with a custom template.** Add a `<ng-template #selectedItem>` that ignores
   the (useless, always-null) template context and instead reads the surrounding component's
   bound form value + options array directly (closures over the outer template scope still work
   fine), looping with `@for` and rendering `p-chip` per selected item, e.g.:

   ```html
   <p-select [ngModel]="value" [multiple]="true" [options]="filterArtists" (onChange)="filter($event.value)">
     <ng-template #selectedItem>
       <div class="flex flex-wrap gap-1">
         @for (v of value; track v) {
           <p-chip [label]="filterArtists | findLabel:v"></p-chip>
         }
       </div>
     </ng-template>
     ...
   </p-select>
   ```

   Needs a label-lookup helper (pipe or component method) per spot since option shapes differ
   (`optionValue`/`optionLabel` vs. full objects), plus care around clearing/reset. More code,
   more surface area for bugs — worth doing once, factored into a shared pipe/directive rather
   than 4 copies, if pursued.

Once all 4 are converted, remove `MultiSelectModule` from `artist.module.ts`,
`artifact.module.ts`, and `d-v.module.ts`. (`media-file.module.ts` also still imports
`MultiSelectModule` but has no `p-multi-select` usage at all — that's pre-existing dead code,
unrelated to this migration.)
