export interface ArtistTableItem {
  id: number;
  artistName: string;
  artistType: string;
  genre?: string;
  isGenre: boolean;
  styles?: Array<String>;
  detailId?: number;
  isDetail: boolean;
}

export interface ArtistEditItem {
  id?: number;
  artistName: string;
  artistType: string;
  artistBiography?: string;
  genre?: string;
  styles?: Array<String>;
}

export const ARTIST_TYPES =
  [
    {name: 'Artist', code: 'A'},
    {name: 'Classics', code: 'C'}
  ];
