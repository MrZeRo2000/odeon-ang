export function sumByKey(data: any, key: string): number {
  return data.map((v: any) => v[key]).filter((v: number) => !isNaN(v)).reduce((a: number, b: number) => a + b, 0);
}
