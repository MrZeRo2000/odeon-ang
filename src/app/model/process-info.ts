export enum ProcessorType {
  MP3_LOADER,
  MP3_VALIDATOR,
  LA_LOADER,
  LA_VALIDATOR,
  ARTISTS_IMPORTER,
  CLASSICS_IMPORTER
}

export const PROCESSOR_TYPE_NAMES : {[processorType: number] : string} = {
  [ProcessorType.MP3_LOADER]: "MP3 Load",
  [ProcessorType.MP3_VALIDATOR]: "MP3 Validate",
  [ProcessorType.LA_LOADER]: "LA Load",
  [ProcessorType.LA_VALIDATOR]: "LA Validate",
  [ProcessorType.ARTISTS_IMPORTER]: "Artists Import",
  [ProcessorType.CLASSICS_IMPORTER]: "Classics importer"
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

export interface ProgressDetail {
  time: string,
  info: string,
  status: string,
  processingAction: ProcessingAction
}

export interface ProcessInfo {
  processorType?: string,
  processingStatus?: string,
  lastUpdated?: string,
  progressDetails?: Array<ProgressDetail>,
  lastProgressDetail?: ProgressDetail
}
