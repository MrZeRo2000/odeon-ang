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
  title: string;
  year?: number;
  duration?: number;
  size?: number
}

export const ARTIFACT_TYPES =
  [
    {name: 'MP3', code: 101},
    {name: 'LA', code: 102}
  ];

