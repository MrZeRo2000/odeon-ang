import { Pipe, PipeTransform } from '@angular/core';
import {PROCESSING_STATUS_NAMES, ProcessingStatus} from "../model/process-info";

@Pipe({
  name: 'processingStatusName'
})
export class ProcessingStatusNamePipe implements PipeTransform {

  transform(value: string): string {
    return PROCESSING_STATUS_NAMES[ProcessingStatus[value as keyof typeof ProcessingStatus]];
  }
}
