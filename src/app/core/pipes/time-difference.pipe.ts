import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'td',
  standalone: false
})
export class TimeDifferencePipe implements PipeTransform {
  transform(startDate: Date | string, endDate: Date | string = new Date()): string {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    let diffInSeconds = Math.floor((end - start) / 1000);

    if (diffInSeconds < 0) return '00:00:00'; // Ensure no negative values

    const hours = Math.floor(diffInSeconds / 3600);
    diffInSeconds %= 3600;
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
