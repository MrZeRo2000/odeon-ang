import { Pipe, PipeTransform } from '@angular/core';
import {PROCESSOR_TYPE_NAMES, ProcessorType} from "../../model/process-info";

@Pipe({
  name: 'processorTypeName'
})
export class ProcessorTypeNamePipe implements PipeTransform {

  transform(value: string | undefined): string {
    return PROCESSOR_TYPE_NAMES[ProcessorType[value as keyof typeof ProcessorType]];
  }
}
