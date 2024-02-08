import {DVCategory} from "./dv-product";
import {Artifact} from "./artifacts";
import {MediaFile} from "./media-file";
import {IdName} from "./common";

export interface ImportStats {
  rowsInserted: Array<string>;
  rowsUpdated: Array<string>;
}

export interface DVProductUserImportDetail {
  title: string;
  originalTitle?: string;
  year?: number
}

export interface DVProductUserImport {
  artifactTypeId: number;
  dvOriginId: number;
  dvProductDetails: Array<DVProductUserImportDetail>;
  frontInfo?: string;
  dvCategories: Array<DVCategory>
}

export interface TrackUserImport {
  artifact: Artifact;
  mediaFile: MediaFile;
  dvType: IdName;
  num?: number
  titles: Array<string>;
  artists?: Array<string>;
  chapters?: Array<string>;
}
