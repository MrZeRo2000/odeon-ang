import {EditConfigItem, getConfigItem} from "./edit-config";
import {Artist} from "./artists";
import {DVProduct} from "./dv-product";
import {Artifact} from "./artifacts";
import {DVType} from "./dvtype";
import {MediaFile} from "./media-file";
import {IdName} from "./common";

export interface Track {
  id?: number;
  artifact: Artifact;
  artifactType?: IdName,
  artist?: Artist;
  performerArtist?: Artist;
  dvType?: DVType;
  title: string;
  duration?: number;
  diskNum?: number;
  num: number;
  size?: number;
  bitRate?: number;
  mediaFiles: MediaFile[];
  dvProduct?: DVProduct;
  tags?: Array<string>;
}

export interface TrackConfigItem extends EditConfigItem {
  hasArtist: boolean,
  hasPerformerArtist: boolean,
  hasDvType: boolean,
  hasDiskNum: boolean,
  hasProducts: boolean,
}

export interface TrackSelectedDVTypeUserUpdate {
  artifact: Artifact,
  trackIds: Array<number>,
  dvType: DVType
}

export interface TrackSelectedTagsUserUpdate {
  artifact: Artifact,
  trackIds: Array<number>,
  tags: Array<string>
}

export interface TrackDurationsUserUpdate {
  artifact: Artifact,
  mediaFile: MediaFile,
  chapters: Array<string>
}

const TRACK_EDIT_CONFIG: Array<TrackConfigItem> = [
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
    hasDiskNum: false,
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

export interface RowsAffected {
  rowsAffected: number
}

export function getTrackConfig(code: number, artistType: string = ""): TrackConfigItem {
  return getConfigItem(TRACK_EDIT_CONFIG, code, artistType)
}
