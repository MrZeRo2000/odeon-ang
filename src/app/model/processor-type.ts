export enum ProcessorType {
  MP3_LOADER,
  MP3_VALIDATOR,
  LA_LOADER,
  LA_VALIDATOR,
  ARTISTS_IMPORTER
}

export const PROCESSOR_TYPE_NAMES : {[processorType: number] : string} = {
  [ProcessorType.MP3_LOADER]: "MP3 Loader",
  [ProcessorType.MP3_VALIDATOR]: "MP3 Validator",
  [ProcessorType.LA_LOADER]: "LA Loader",
  [ProcessorType.LA_VALIDATOR]: "LA Validator",
  [ProcessorType.ARTISTS_IMPORTER]: "Artists Importer"
}
