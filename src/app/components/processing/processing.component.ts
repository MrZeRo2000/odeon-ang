import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  ProcessInfo,
  PROCESSING_STATUS_NAMES,
  ProcessingAction,
  ProcessingStatus,
  PROCESSOR_TYPE_NAMES,
  ProcessorType
} from "../../model/process-info";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {ProcessService} from "../../service/process.service";
import {BaseComponent} from "../base/base.component";
import {ProcessorRequest} from "../../model/processor-request";
import {
  catchError, combineLatest, combineLatestWith,
  concat,
  map,
  of,
  race,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  throwError
} from "rxjs";
import {CRUDAction} from "../../model/crud";
import {ArtistService} from "../../service/artist.service";
import {ARTIST_TYPES, ArtistEditItem} from "../../model/artists";
import {A} from "@angular/cdk/keycodes";

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

  //private processorTypeAction = new Subject<ProcessorType | undefined>();
  //private addArtistAction = new Subject<string>();

  private action = new Subject<ProcessorType | ProcessingAction | undefined>();

  readonly PROGRESS_STATUS = ProcessingStatus[ProcessingStatus.IN_PROGRESS];

  processInfo$ = this.action.asObservable().pipe(
    tap(v => {console.log(`value: ${JSON.stringify(v)}`)}),
    startWith(undefined),
    switchMap(v => {
      if (v == undefined) {
        return of({message: undefined})
      } else if (typeof v === 'number') {
        console.log('value is ProcessorType')
        return this.processService.startProcess({
          processorType: ProcessorType[v as ProcessorType]
        }).pipe(
          catchError(err => {
            console.error(`Caught error: ${err.error?.message}`);
            this.messageService.add({severity:'error', summary:'Error', detail:`Error starting process: ${err.error?.message || err.message}`});
            //return throwError(err);
            return of({message: undefined});
          }),
        )
      } else if ('actionType' in v) {
        console.log(`Got action: ${JSON.stringify(v)}`);
        const processingAction: ProcessingAction = v as ProcessingAction;
        const artistData: ArtistEditItem = {
          artistName: v.value,
          artistType: ARTIST_TYPES[0].code
        }
        return this.artistService.create(artistData).pipe(
          catchError(err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error creating artist: ${err.error?.message || err.message}`
            });
            return of(undefined);
          }),
          switchMap(v => {
            if (!!v) {
              return this.processService.resolveAction(processingAction).pipe(
                catchError(err => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error resolving action: ${err.error?.message || err.message}`
                  });
                  return of(undefined);
                }),
                tap(() => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Info',
                    detail: `Artist ${v.artistName} added`
                  });
                })
              )
            } else {
              return of(undefined);
            }
          })
        );
      } else {
        return of({message: undefined})
      }
    }),
    tap(v => {console.log(`Before get process info: ${JSON.stringify(v)}`)}),
    switchMap(v => {
      if (v !== undefined && 'processingStatus' in v) {
        return of(v as ProcessInfo);
      } else {
        return this.processService.getProcessInfo();
      }
    }
    )
  );

  constructor(
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private processService: ProcessService,
    private artistService: ArtistService
  ) {
    super();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
          this.action.next(processorAction);
        }
      });
    }
  }

  resolveActionAddArtist(processingAction: ProcessingAction): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to add <strong> ${processingAction.value}</strong>?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.artistTable$ = this.getArtistTable({action: CRUDAction.EA_DELETE, data: item});
        this.action.next(processingAction);
      }
    });
  }

}
