import {EditConfigItem, getConfigItem} from "./edit-config";

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

export interface ArtifactConfigItem extends EditConfigItem {
  hasArtist: boolean,
  requiresArtist: boolean,
  hasPerformerArtist: boolean,
  requiresPerformerArtist: boolean,
  hasYear: boolean,
  requiresYear: boolean
}

const ARTIFACT_EDIT_CONFIG: Array<ArtifactConfigItem> = [
  {
    code: 101,
    name: 'MP3',
    artistType: "A",
    isMusic: true,
    isVideo: false,
    hasArtist: true,
    requiresArtist: true,
    hasPerformerArtist: false,
    requiresPerformerArtist: false,
    hasYear: true,
    requiresYear: true,
  },
  {
    code: 102,
    name: 'LA',
    artistType: "A",
    isMusic: true,
    isVideo: false,
    hasArtist: true,
    requiresArtist: true,
    hasPerformerArtist: false,
    requiresPerformerArtist: false,
    hasYear: true,
    requiresYear: true,
  },
  {
    code: 101,
    name: 'MP3',
    artistType: "C",
    isMusic: true,
    isVideo: false,
    hasArtist: true,
    requiresArtist: true,
    hasPerformerArtist: true,
    requiresPerformerArtist: false,
    hasYear: true,
    requiresYear: true,
  },
  {
    code: 102,
    name: 'LA',
    artistType: "C",
    isMusic: true,
    isVideo: false,
    hasArtist: true,
    requiresArtist: true,
    hasPerformerArtist: true,
    requiresPerformerArtist: false,
    hasYear: true,
    requiresYear: true,
  },
  {
    code: 201,
    name: 'Music',
    artistType: "A",
    isMusic: true,
    isVideo: true,
    hasArtist: true,
    requiresArtist: true,
    hasPerformerArtist: false,
    requiresPerformerArtist: false,
    hasYear: true,
    requiresYear: false,
  },
  {
    code: 202,
    name: 'Movies',
    artistType: "A",
    isMusic: false,
    isVideo: true,
    hasArtist: false,
    requiresArtist: false,
    hasPerformerArtist: false,
    requiresPerformerArtist: false,
    hasYear: false,
    requiresYear: false,
  },
  {
    code: 203,
    name: 'Animation',
    artistType: "A",
    isMusic: false,
    isVideo: true,
    hasArtist: false,
    requiresArtist: false,
    hasPerformerArtist: false,
    requiresPerformerArtist: false,
    hasYear: false,
    requiresYear: false,
  },
  {
    code: 204,
    name: 'Other',
    artistType: "A",
    isMusic: false,
    isVideo: true,
    hasArtist: false,
    requiresArtist: false,
    hasPerformerArtist: false,
    requiresPerformerArtist: false,
    hasYear: false,
    requiresYear: false,
  },
];

export function getArtifactConfig(code: number, artistType: string = ""): ArtifactConfigItem {
  return getConfigItem(ARTIFACT_EDIT_CONFIG, code, artistType)
}
