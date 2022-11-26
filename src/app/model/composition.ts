export interface CompositionTableItem {
  id: number;
  diskNum: number;
  num: number;
  artistId?: number;
  artistName?: string;
  performerArtistId?: number;
  performerArtistName?: string;
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
  artistId?: number;
  artistName?: string;
  performerArtistId?: number;
  performerArtistName?: string;
  title: string;
  duration?: number;
  mediaFileIds: number[];
}
