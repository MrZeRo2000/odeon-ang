import { Component, OnInit } from '@angular/core';
import {PROCESSOR_TYPE_NAMES, ProcessorType} from "../../model/process-info";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {ProcessService} from "../../service/process.service";
import {BaseComponent} from "../base/base.component";
import {ProcessorRequest} from "../../model/processor-request";
import {catchError, switchMap, takeUntil, tap, throwError} from "rxjs";

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
  providers: [ConfirmationService]
})
export class ProcessingComponent extends BaseComponent implements OnInit {
  readonly treeValues = [
    {
      label: "Import",
      selectable: true,
      children: [
        {
          label: "Artists",
          data: ProcessorType.ARTISTS_IMPORTER,
          leaf: true
        }
      ]
    },
    {
      label: "Validate",
      children: [
        {
          label: "MP3",
          data: ProcessorType.MP3_VALIDATOR,
          leaf: true
        },
        {
          label: "LA",
          data: ProcessorType.LA_VALIDATOR,
          leaf: true
        }
      ]
    },
    {
      label: "Load",
      children: [
        {
          label: "MP3",
          data: ProcessorType.MP3_LOADER,
          leaf: true
        },
        {
          label: "LA",
          data: ProcessorType.LA_LOADER,
          leaf: true
        }
      ]
    }
  ];

  processing = false;

  processInfo$ = this.processService.processInfo$;

  constructor(
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private processService: ProcessService) {
    super();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  nodeSelect(event: any) : void {
    if (event.node.data == undefined) {
      event.node.expanded = !event.node.expanded;
    } else {
      console.log('Note select:' + event.node.data);
      const processorAction: ProcessorType = event.node.data;
      this.confirmationService.confirm({
        message: `Are you sure that you want to execute <strong> ${PROCESSOR_TYPE_NAMES[processorAction]}</strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          //Actual logic to perform a confirmation
          this.startProcess(processorAction);
        }
      });
    }
  }

  private startProcess(processorType: ProcessorType): void {
    this.processing = true;
    this.processService.startProcess({processorType: ProcessorType[processorType]}).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.processing = false;
        console.error(`Caught error: ${err.error?.message}`);
        this.messageService.add({severity:'error', summary:'Error', detail:`Error starting process: ${err.error?.message || err.message}`});
        return throwError(err);
      })
    ).subscribe(message => {
      this.processing = false;
      console.log(message.message);
      this.processInfo$ = this.processService.getProcessInfo();
    })
    ;
  }

}
