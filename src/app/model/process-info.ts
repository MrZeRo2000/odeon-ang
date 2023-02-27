export enum ProcessorType {
  MP3_LOADER,
  MP3_VALIDATOR,
  LA_LOADER,
  LA_VALIDATOR,
  ARTISTS_IMPORTER,
  CLASSICS_IMPORTER,
  CLASSICS_VALIDATOR,
  DV_MUSIC_IMPORTER,
  DV_MUSIC_MEDIA_LOADER,
  DV_MUSIC_VALIDATOR,
}

export const PROCESSOR_TYPE_NAMES : {[processorType: number] : string} = {
  [ProcessorType.MP3_LOADER]: "MP3 Load",
  [ProcessorType.MP3_VALIDATOR]: "MP3 Validate",
  [ProcessorType.LA_LOADER]: "LA Load",
  [ProcessorType.LA_VALIDATOR]: "LA Validate",
  [ProcessorType.ARTISTS_IMPORTER]: "Artists Import",
  [ProcessorType.CLASSICS_IMPORTER]: "Classics importer",
  [ProcessorType.CLASSICS_VALIDATOR]: "Classics validator",
  [ProcessorType.DV_MUSIC_IMPORTER]: "Video music importer",
  [ProcessorType.DV_MUSIC_MEDIA_LOADER]: "Video music media loader",
  [ProcessorType.DV_MUSIC_VALIDATOR]: "Video music validator",
}

export enum ProcessingStatus {
  IN_PROGRESS,
  SUCCESS,
  INFO,
  FAILURE,
  WARNING,
  NOT_RUNNING
}

export const PROCESSING_STATUS_NAMES : {[processingStatus: number] : string} = {
  [ProcessingStatus.IN_PROGRESS]: "In Progress",
  [ProcessingStatus.SUCCESS]: "Success",
  [ProcessingStatus.INFO]: "Info",
  [ProcessingStatus.FAILURE]: "Failure",
  [ProcessingStatus.WARNING]: "Warning",
  [ProcessingStatus.NOT_RUNNING]: "Not Running",
}

export interface ProcessingAction {
  actionType: string,
  value: string
}

export interface ProcessDetail {
  time: string,
  info: ProcessDetailInfo,
  rows: number,
  status: string,
  processingAction: ProcessingAction
}

export interface ProcessDetailInfo {
  message: string,
  items: Array<string>
}

export interface ProcessInfo {
  processorType?: string,
  processingStatus?: string,
  lastUpdated?: string,
  processDetails?: Array<ProcessDetail>
}
