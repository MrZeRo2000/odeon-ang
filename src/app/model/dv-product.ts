

export interface DVOrigin {
  id?: number;
  name: string
}

export interface DVCategory {
  id?: number;
  name: string;
}

export interface DVProduct {
  id?: number;
  artifactTypeId: number;
  dvOrigin: DVOrigin;
  title: string;
  originalTitle?: string;
  year?: number;
  frontInfo?: string;
  description?: string;
  hasDescription?: boolean;
  notes?: string;
  hasNotes?: boolean;
  dvCategories: Array<DVCategory>;
  hasTracks?: boolean
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

export interface ImportStats {
  rowsInserted: Array<string>;
  rowsUpdated: Array<string>;
}
