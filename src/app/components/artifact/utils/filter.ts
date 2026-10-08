import {Artifact} from "../../../model/artifacts";
import {FilterService, SelectItem} from "primeng/api";
import {Track} from "../../../model/track";

export function getFilterArtists(v: Array<Artifact | Track>): Array<SelectItem> {
  return [... new Set(v?.map(v => {return v.artist?.artistName as string}))]
    .sort()
    .map(v => {return {label: v, value: v} as SelectItem})
}

export function getFilterTags(v: Array<Artifact | Track >): Array<SelectItem> {
  return [... new Set(v?.map(v => v.tags || []).flat())]
    .sort()
    .map(v => {return {label: v, value: v} as SelectItem})
}

export function registerFilterService(filterService: FilterService) {
  filterService.register(
    'filter_tags',
    (value: any, filter: any): boolean => {
      console.log(`Filter: Value: ${JSON.stringify(value)}, filter: ${JSON.stringify(filter)}`)
      if (filter === undefined || filter === null || filter.length === 0) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return (value as string[]).filter(v => filter.indexOf(v) !== -1).length > 0;
    }
  )
}

/**
 * PrimeNG 22.1.5: p-table's "sync filters" effect runs after restoreState() and resets the
 * restored filters to the (empty) `filters` input, so stateful tables come back with blank
 * column filters. Seeding `[filters]` with the saved filters makes that reset a no-op.
 */
export function loadSavedTableFilters(stateKey: string): Record<string, any> {
  try {
    const filters = JSON.parse(sessionStorage.getItem(stateKey) as string)?.filters ?? {};
    // Same as Table.restoreState(): applyFilter makes the column filter icon show as active
    Object.values<any>(filters).forEach(f => {
      const constraint = Array.isArray(f) ? f[0] : f;
      if (constraint?.value) {
        constraint.applyFilter = true;
      }
    });
    return filters;
  } catch (e) {
    return {};
  }
}
