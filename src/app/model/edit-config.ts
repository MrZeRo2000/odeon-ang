export interface EditConfigItem {
  code: number,
  name: string,
  artistType: "A" | "C",
  isMusic: boolean,
  isVideo: boolean,
}

export function getConfigItem<T extends EditConfigItem>(config: Array<T>, code: number, artistType: string = ""): T {
  return config.filter(v => v.code === code && (!artistType || v.artistType === artistType))[0]
}
