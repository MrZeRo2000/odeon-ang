import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PROCESSOR_TYPE_NAMES, ProcessorType} from "../../model/process-info";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {ProcessService} from "../../service/process.service";
import {BaseComponent} from "../base/base.component";
import {ProcessorRequest} from "../../model/processor-request";
import {catchError, map, of, Subject, switchMap, takeUntil, tap, throwError} from "rxjs";

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
  providers: [ConfirmationService]
})
export class ProcessingComponent extends BaseComponent implements OnInit, AfterViewInit {
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

  processInfo$ = this.processService.processInfo$;

  private processorTypeAction = new Subject<ProcessorType | undefined>();

  pi$ = this.processorTypeAction.pipe(
    tap(v => {console.log(`Processor type value: ${v || "undefined"}`)}),
    switchMap(v => {
      if (v == undefined) {
        return of({message: ""})
      } else {
        return this.processService.startProcess({
          processorType: ProcessorType[v]
        }).pipe(
          catchError(err => {
            console.error(`Caught error: ${err.error?.message}`);
            this.messageService.add({severity:'error', summary:'Error', detail:`Error starting process: ${err.error?.message || err.message}`});
            //return throwError(err);
            return of({message: err.error?.message});
          }),
        )
      }
    }),
    tap(v => {console.log(`Start process value: ${v.message}`)}),
    switchMap(v => this.processService.getProcessInfo())
  );

  constructor(
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private processService: ProcessService) {
    super();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    setTimeout(() => {this.processorTypeAction.next(undefined);}, 0);
  }

  ngAfterViewInit(): void {
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
          //this.startProcess(processorAction);
          this.processorTypeAction.next(processorAction);
        }
      });
    }
  }

}
