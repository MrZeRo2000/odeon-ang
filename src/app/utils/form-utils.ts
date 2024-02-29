
export function textToArray(text?: string): Array<string> {
  return text ? text.split('\n').filter((v: any) => !!v) : []
}
