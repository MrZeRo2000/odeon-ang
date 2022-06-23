export interface CompositionTableItem {
  id: number;
  diskNum: number;
  num: number;
  title: string;
  duration?: number;
  size?: number;
  bitrate?: number;
  fileName?: string
}

export interface CompositionEditItem {
  id?: number;
  artifactId: number;
  diskNum: number;
  num: number;
  title: string;
  duration?: number;
  mediaName?: string;
  mediaFormat?: string;
  mediaSize?: number;
  mediaBitrate: number;
  mediaDuration: number;
}
