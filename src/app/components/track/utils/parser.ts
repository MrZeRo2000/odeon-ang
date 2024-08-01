export class Parser {
  static parseMusicVideoTrack(fileName: string): {artistName?: string, title?: string} {
    const re = /^([0-9]{2,3})\s(\S.+?\S)(?:\s-\s(\S.+?\S))*(?:\s*\([\d^)]{4}\))*\.\S{2,4}$/
    const match = re.exec(fileName)
    if (match?.length === 4) {
      return match[3]? {artistName: match[2], title: match[3]} : {title: match[2]}
    } else {
      return {}
    }
  }
}
