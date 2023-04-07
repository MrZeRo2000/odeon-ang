

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
  notes?: string;
  dvCategories: Array<DVCategory>;
}
