import {IdName} from "./common";

export interface DVType extends IdName{}

export const DV_TYPES: DVType[] = [
  {id: 1, name: "VHS"},
  {id: 2, name: "MPEG4 DVD"},
  {id: 3, name: "DVD"},
  {id: 4, name: "MPEG4 VHS"},
  {id: 5, name: "MPEG4 TV"},
  {id: 6, name: "HDTV Rip"},
  {id: 7, name: "AVC"},
  {id: 8, name: "DVD Rip"},
]
