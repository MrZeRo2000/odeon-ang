export interface TrackTableItem {
  id: number;
  diskNum: number;
  num: number;
  artistId?: number;
  artistName?: string;
  performerArtistId?: number;
  performerArtistName?: string;
  dvTypeId?: number;
  dvTypeName?: string;
  title: string;
  duration?: number;
  size?: number;
  bitrate?: number;
  fileName?: string
}

export interface TrackEditItem {
  id?: number;
  artifactId: number;
  diskNum: number;
  num: number;
  artistId?: number;
  artistName?: string;
  performerArtistId?: number;
  performerArtistName?: string;
  dvTypeId?: number;
  dvTypeName?: string;
  title: string;
  duration?: number;
  mediaFileIds: number[];
  dvProductId?: number;
  dvProductTitle?: string;
}
