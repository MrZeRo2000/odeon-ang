export interface ArtistLyricsTableItem {
  id:	number,
  artistName:	string,
  title:	string
}

export interface ArtistLyricsEditItem {
  id?:	number,
  artistId: number,
  title:	string,
  text:	string
}

export interface ArtistLyricsText {
  artistName:	string,
  title:	string,
  text:	string
}


