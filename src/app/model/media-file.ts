export interface MediaFileTableItem {
  id: number,
  name: string,
  format: string,
  size: number,
  bitrate: number,
  duration: number
}

export interface MediaFileEditItem {
  id?: number,
  artifactId: number,
  name: string,
  format: string,
  size: number,
  bitrate: number,
  duration: number
}
