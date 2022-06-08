export interface ArtistTableItem {
  id: number;
  artistName: string;
  genre?: string;
  styles?: Array<String>;
  detailId?: number;
}

export interface ArtistEditItem {
  id: number;
  artistName: string;
  biography: string;
  genre?: string;
  styles?: Array<String>;
}
