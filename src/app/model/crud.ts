export enum CRUDAction {
  EA_CREATE,
  EA_READ,
  EA_UPDATE,
  EA_DELETE
}

export interface CRUDOperation<T> {
  action: CRUDAction,
  data: T
}

export interface CRUDResult<T> {
  success: boolean,
  data?: T | string
}
