export interface Artist {
  id?: number;
  artistName: string;
  artistType?: string;
  artistBiography?: string;
  genre?: string;
  isGenre?: boolean;
  styles?: Array<string>;
  detailId?: number;
  isDetail?: boolean;
  hasLyrics?: boolean;
}
export const ARTIST_TYPE_CODE_ARTIST = 'A';
export const ARTIST_TYPE_CODE_CLASSICS = 'C';

export const ARTIST_TYPES =
  [
    {name: 'Artist', code: ARTIST_TYPE_CODE_ARTIST},
    {name: 'Classics', code: ARTIST_TYPE_CODE_CLASSICS}
  ];
