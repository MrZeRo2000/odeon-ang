
export function filterString(data: Array<string>, pattern: string): Array<string> {
  return [...data.filter(v => v.toLowerCase().indexOf(pattern.toLowerCase()) === 0)]
}
