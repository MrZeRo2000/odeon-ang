export enum ProcessorType {
  CLASSICS_VALIDATOR,

  MP3_LOADER,
  MP3_VALIDATOR,
  LA_LOADER,
  LA_VALIDATOR,

  DV_MOVIES_LOADER,
  DV_MOVIES_VALIDATOR,
  DV_MOVIES_MEDIA_LOADER,

  DV_MUSIC_LOADER,
  DV_MUSIC_VALIDATOR,
  DV_MUSIC_MEDIA_LOADER,

  DV_ANIMATION_LOADER,
  DV_ANIMATION_VALIDATOR,
  DV_ANIMATION_MEDIA_LOADER,
}

export const PROCESSOR_TYPE_NAMES : {[processorType: number] : string} = {
  [ProcessorType.CLASSICS_VALIDATOR]: "Classics Validate",

  [ProcessorType.MP3_LOADER]: "MP3 Load",
  [ProcessorType.MP3_VALIDATOR]: "MP3 Validate",
  [ProcessorType.LA_LOADER]: "LA Load",
  [ProcessorType.LA_VALIDATOR]: "LA Validate",

  [ProcessorType.DV_MUSIC_LOADER]: "Video Music Load",
  [ProcessorType.DV_MUSIC_VALIDATOR]: "Video Music Validate",
  [ProcessorType.DV_MUSIC_MEDIA_LOADER]: "Video Music Media Load",

  [ProcessorType.DV_MOVIES_LOADER]: "Movies Load",
  [ProcessorType.DV_MOVIES_VALIDATOR]: "Movies Validate",
  [ProcessorType.DV_MOVIES_MEDIA_LOADER]: "Movies Media Load",

  [ProcessorType.DV_ANIMATION_LOADER]: "Animation Load",
  [ProcessorType.DV_ANIMATION_VALIDATOR]: "Animation Validate",
  [ProcessorType.DV_ANIMATION_MEDIA_LOADER]: "Animation Media Load",
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

export interface ProcessingEvent {
  updateDateTime: string;
  message: string;
}

export interface ProcessDetail {
  updateDateTime: string,
  rows: number,
  status: string,
  message: string,
  items: Array<string>,
  processingAction: ProcessingAction
}

export interface ProcessInfo {
  id?: number,
  processorType?: string,
  processingStatus?: string,
  updateDateTime?: string,
  processDetails?: Array<ProcessDetail>,
  processingEvent?: ProcessingEvent,
}
