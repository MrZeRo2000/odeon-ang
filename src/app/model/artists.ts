export interface ArtistTableItem {
  id: number;
  artistName: string;
  artistType: string;
  genre?: string;
  styles?: Array<String>;
  detailId?: number;
}

export interface ArtistEditItem {
  id?: number;
  artistName: string;
  artistType: string;
  artistBiography: string;
  genre?: string;
  styles?: Array<String>;
}

export const ARTIST_TYPES =
  [
    {name: 'Artist', code: 'A'},
    {name: 'Classics', code: 'C'}
  ];
