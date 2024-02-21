export interface MediaFile {
  id?: number,
  artifactId: number,
  name: string,
  format: string,
  size: number,
  bitrate: number,
  duration: number,
  width?: number,
  height?: number
}
