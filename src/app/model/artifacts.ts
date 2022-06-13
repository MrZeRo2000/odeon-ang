export interface ArtifactTableItem {
  id: number;
  artifactTypeName: string;
  artistName: string;
  title: string;
  year?: number;
  duration?: number;
  size?: number;
  insertDate: Date;
}

export const ARTIFACT_TYPES =
  [
    {name: 'MP3', code: '101'},
    {name: 'LA', code: '102'}
  ];
