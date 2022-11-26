export interface ArtifactTableItem {
  id: number;
  artistTypeCode: string;
  artifactTypeName: string;
  artistName: string;
  title: string;
  year?: number;
  duration?: number;
  size?: number;
  insertDate: Date;
}

export interface ArtifactEditItem {
  id?: number;
  artifactTypeId: number;
  artistTypeCode: string;
  artistId: number;
  artistName: string;
  performerArtistId: number;
  performerArtistName: string;
  title: string;
  year?: number;
  duration?: number;
  size?: number
}

export const ARTIFACT_TYPE_MUSIC = 100;

export const ARTIFACT_TYPE_VIDEO = 200;


export const ARTIFACT_MUSIC_TYPE_MP3 = 101;

export const ARTIFACT_MUSIC_TYPE_LA = 102;

export const ARTIFACT_MUSIC_TYPES =
  [
    {name: 'MP3', code: ARTIFACT_MUSIC_TYPE_MP3},
    {name: 'LA', code: ARTIFACT_MUSIC_TYPE_LA}
  ];

export function isArtifactTypeMusic(artifactTypeId: number) : boolean {
  return ARTIFACT_MUSIC_TYPES.map(v => v['code']).indexOf(artifactTypeId) !== -1;
}

export const ARTIFACT_VIDEO_TYPE_MUSIC = 201;

export const ARTIFACT_VIDEO_TYPES =
  [
    {name: 'Music', code: ARTIFACT_VIDEO_TYPE_MUSIC},
    {name: 'Movies', code: 202},
    {name: 'Animation', code: 203},
  ];

export function isArtifactTypeVideo(artifactTypeId: number) : boolean {
  return ARTIFACT_VIDEO_TYPES.map(v => v['code']).indexOf(artifactTypeId) !== -1;
}
