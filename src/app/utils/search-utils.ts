import {IdName, IdTitle} from "../model/common";

export function filterString(data: Array<string>, pattern: string): Array<string> {
  return [...data.filter(v => v.toLowerCase().indexOf(pattern.toLowerCase()) === 0)]
}

export function filterIdName(data: Array<IdName>, pattern: string): Array<IdName> {
  return [...data.filter(v => v.name.toLowerCase().indexOf(pattern.toLowerCase()) === 0)]
}

export function filterIdTitle(data: Array<IdTitle>, pattern: string): Array<IdTitle> {
  return [...data.filter(v => v.title.toLowerCase().indexOf(pattern.toLowerCase()) === 0)]
}
