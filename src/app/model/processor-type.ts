export enum ProcessorType {
  MP3_LOADER,
  MP3_VALIDATOR,
  LA_LOADER,
  LA_VALIDATOR,
  ARTISTS_IMPORTER
}

export const PROCESSOR_TYPE_NAMES : {[processorType: number] : string} = {
  [ProcessorType.MP3_LOADER]: "MP3 Load",
  [ProcessorType.MP3_VALIDATOR]: "MP3 Validate",
  [ProcessorType.LA_LOADER]: "LA Load",
  [ProcessorType.LA_VALIDATOR]: "LA Validate",
  [ProcessorType.ARTISTS_IMPORTER]: "Artists Import"
}
