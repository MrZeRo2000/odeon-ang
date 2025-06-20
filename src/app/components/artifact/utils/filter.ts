import {Artifact} from "../../../model/artifacts";
import {SelectItem} from "primeng/api/selectitem";
import {FilterService} from "primeng/api";
import {Track} from "../../../model/track";

export function getFilterArtists(v: Array<Artifact>): Array<SelectItem> {
  return [... new Set(v?.map(v => {return (v as Artifact).artist?.artistName as string}))]
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
