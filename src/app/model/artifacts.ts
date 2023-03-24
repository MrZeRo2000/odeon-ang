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
    {name: 'Other', code: 204},
  ];

export function isArtifactTypeVideo(artifactTypeId: number) : boolean {
  return ARTIFACT_VIDEO_TYPES.map(v => v['code']).indexOf(artifactTypeId) !== -1;
}

export function isArtifactTypeVideoMusic(artifactTypeId: number) : boolean {
  return artifactTypeId === ARTIFACT_VIDEO_TYPE_MUSIC;
}

export function isArtifactTypeVideoWithProducts(artifactTypeId: number): boolean {
  return ARTIFACT_VIDEO_TYPES
    .map(v => v['code'])
    .filter(v => v !== ARTIFACT_VIDEO_TYPE_MUSIC)
    .indexOf(artifactTypeId) !== -1;
}

export interface TrackConfigItem {
  code: number,
  name: string,
  artistType: "A" | "C",
  isMusic: boolean,
  isVideo: boolean,
  hasArtist: boolean,
  hasPerformerArtist: boolean,
  hasDvType: boolean,
  hasDiskNum: boolean,
  hasProducts: boolean,
}

export const TRACK_EDIT_CONFIG: Array<TrackConfigItem> = [
  {
    code: 101,
    name: 'MP3',
    artistType: "A",
    isMusic: true,
    isVideo: false,
    hasArtist: false,
    hasPerformerArtist: false,
    hasDvType: false,
    hasDiskNum: true,
    hasProducts: false,
  },
  {
    code: 102,
    name: 'LA',
    artistType: "A",
    isMusic: true,
    isVideo: false,
    hasArtist: false,
    hasPerformerArtist: false,
    hasDvType: false,
    hasDiskNum: true,
    hasProducts: false,
  },
  {
    code: 101,
    name: 'MP3',
    artistType: "C",
    isMusic: true,
    isVideo: false,
    hasArtist: true,
    hasPerformerArtist: true,
    hasDvType: false,
    hasDiskNum: true,
    hasProducts: false,
  },
  {
    code: 102,
    name: 'LA',
    artistType: "A",
    isMusic: true,
    isVideo: false,
    hasArtist: true,
    hasPerformerArtist: true,
    hasDvType: false,
    hasDiskNum: true,
    hasProducts: false,
  },
  {
    code: 201,
    name: 'Music',
    artistType: "A",
    isMusic: true,
    isVideo: true,
    hasArtist: true,
    hasPerformerArtist: false,
    hasDvType: true,
    hasDiskNum: true,
    hasProducts: false,
  },
  {
    code: 202,
    name: 'Movies',
    artistType: "A",
    isMusic: false,
    isVideo: true,
    hasArtist: false,
    hasPerformerArtist: false,
    hasDvType: true,
    hasDiskNum: false,
    hasProducts: true,
  },
  {
    code: 203,
    name: 'Animation',
    artistType: "A",
    isMusic: false,
    isVideo: true,
    hasArtist: false,
    hasPerformerArtist: false,
    hasDvType: true,
    hasDiskNum: false,
    hasProducts: true,
  },
  {
    code: 204,
    name: 'Other',
    artistType: "A",
    isMusic: false,
    isVideo: true,
    hasArtist: false,
    hasPerformerArtist: false,
    hasDvType: true,
    hasDiskNum: false,
    hasProducts: false,
  },
]

export function getTrackConfig(code: number, artistType: string = ""): TrackConfigItem {
  return TRACK_EDIT_CONFIG.filter(v => v.code === code && (!artistType || v.artistType === artistType))[0]
}
