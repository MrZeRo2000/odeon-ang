import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProcessingStatus} from "../../../model/process-info";

enum IndicatorType {
  IT_NONE,
  IT_ERROR,
  IT_WARNING,
  IT_INFO,
  IT_SUCCESS
}

const PROCESSING_TYPES : {[processingStatus: number] : IndicatorType} = {
  [ProcessingStatus.FAILURE]: IndicatorType.IT_ERROR,
  [ProcessingStatus.INFO]: IndicatorType.IT_INFO,
  [ProcessingStatus.WARNING]: IndicatorType.IT_WARNING,
  [ProcessingStatus.SUCCESS]: IndicatorType.IT_SUCCESS
}


@Component({
    selector: 'app-processing-status-indicator',
    templateUrl: './processing-status-indicator.component.html',
    styleUrls: ['./processing-status-indicator.component.css'],
    standalone: false
})
export class ProcessingStatusIndicatorComponent implements OnInit, OnChanges {
  IndicatorType = IndicatorType;

  @Input()
  processingStatus?: string;

  indicatorType: IndicatorType = IndicatorType.IT_NONE;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["processingStatus"]?.isFirstChange()) {
      const processingStatus = ProcessingStatus[changes["processingStatus"].currentValue as keyof typeof ProcessingStatus];
      this.indicatorType = PROCESSING_TYPES[processingStatus];
    }
  }
}
