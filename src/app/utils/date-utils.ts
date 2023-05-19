import {formatDate} from "@angular/common";

export class DateFormatter {
  static formatDateTime(date: Date | string): string {
    return formatDate(date, 'dd.MM.yyyy HH:mm:ss', 'en')
  }
}
