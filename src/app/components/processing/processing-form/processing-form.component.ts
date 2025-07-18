import {AfterViewInit, Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {
  ProcessInfo,
  ProcessingAction,
  ProcessingStatus,
  PROCESSOR_TYPE_NAMES,
  ProcessorType
} from "../../../model/process-info";
import {ConfirmationService, MessageService} from "primeng/api";
import {ProcessService} from "../../../service/process.service";
import {BaseComponent} from "../../base/base.component";
import {
  catchError, map, of,
  startWith,
  Subject,
  switchMap,
  tap
} from "rxjs";
import {ArtistService} from "../../../service/artist.service";
import {Artist, ARTIST_TYPES} from "../../../model/artists";
import {DateFormatter} from "../../../utils/date-utils";
import {FormBuilder} from "@angular/forms";
import {PrimeNG} from "primeng/config";
import {TimeDifferencePipe} from "../../../core/pipes/time-difference.pipe";

@Component({
    selector: 'app-processing-form',
    templateUrl: './processing-form.component.html',
    styleUrls: ['./processing-form.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ConfirmationService],
    standalone: false
})
export class ProcessingFormComponent extends BaseComponent implements OnInit, AfterViewInit {
  readonly treeValues = [
    {
      label: "Classics",
      children: [
        {
          label: "Validate",
          data: ProcessorType.CLASSICS_VALIDATOR,
          leaf: true
        },
      ]
    },
    {
      label: "Music",
      children: [
        {
          label: "Load MP3",
          data: ProcessorType.MP3_LOADER,
          leaf: true
        },
        {
          label: "Validate MP3",
          data: ProcessorType.MP3_VALIDATOR,
          leaf: true
        },
        {
          label: "Load LA",
          data: ProcessorType.LA_LOADER,
          leaf: true
        },
        {
          label: "Validate LA",
          data: ProcessorType.LA_VALIDATOR,
          leaf: true
        },
      ]
    },
    {
      label: "Movies",
      children: [
        {
          label: "Load",
          data: ProcessorType.DV_MOVIES_LOADER,
          leaf: true
        },
        {
          label: "Validate",
          data: ProcessorType.DV_MOVIES_VALIDATOR,
          leaf: true
        },
        {
          label: "Load Media",
          data: ProcessorType.DV_MOVIES_MEDIA_LOADER,
          leaf: true
        },
      ]
    },
    {
      label: "Video Music",
      children: [
        {
          label: "Load",
          data: ProcessorType.DV_MUSIC_LOADER,
          leaf: true
        },
        {
          label: "Validate",
          data: ProcessorType.DV_MUSIC_VALIDATOR,
          leaf: true
        },
        {
          label: "Load Media",
          data: ProcessorType.DV_MUSIC_MEDIA_LOADER,
          leaf: true
        },
      ]
    },
    {
      label: "Animation",
      children: [
        {
          label: "Load",
          data: ProcessorType.DV_ANIMATION_LOADER,
          leaf: true
        },
        {
          label: "Validate",
          data: ProcessorType.DV_ANIMATION_VALIDATOR,
          leaf: true
        },
        {
          label: "Load Media",
          data: ProcessorType.DV_ANIMATION_MEDIA_LOADER,
          leaf: true
        },
      ]
    },
  ];

  private action = new Subject<ProcessorType | ProcessingAction | {selectedDate: number} | undefined>();

  readonly PROGRESS_STATUS = ProcessingStatus[ProcessingStatus.IN_PROGRESS];
  readonly SUCCESS_STATUS = ProcessingStatus[ProcessingStatus.SUCCESS];
  readonly FAILURE_STATUS = ProcessingStatus[ProcessingStatus.FAILURE];

  dateForm = this.fb.group({
    selectedDate: [null]
  })

  dateSelection$ = this.dateForm.valueChanges.pipe(
    startWith(this.dateForm.value),
    tap(v => {
      console.log(`Date selection value: ${JSON.stringify(v)}`);
      if (!!v.selectedDate) {
        this.action.next({selectedDate: v.selectedDate});
      } else {
        this.action.next(undefined);
      }
    })
  )

  table$ = this.processService.getTable().pipe(
    map(
      v => v.map(
        p => {
          return {
            id: p.id,
            updateDateTime: DateFormatter.formatDateTime(new Date(p.updateDateTime as string)),
            processingStatus: p.processingStatus
          } as ProcessInfo
        }))
  );

  private tableRefreshed = false;

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
        const artistData: Artist = {
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
      } else if ('selectedDate' in v) {
        const selectedDate = v['selectedDate'] as number;
        return this.processService.getProcessInfoById(selectedDate).pipe(
          catchError(err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error getting process data`
            });
            return of(undefined);
          })
        )
      } else {
        return of({message: undefined})
      }
    }),
    tap(v => {console.log(`Before get process info: ${JSON.stringify(v)}`)}),
    switchMap(v => {
      if (v !== undefined && 'processingStatus' in v) {
        return of(v as ProcessInfo);
      } else {
        this.tableRefreshed = false;
        return this.processService.getProcessInfo();
      }
    },
    ),
  );

  private primengConfig = inject(PrimeNG);

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private processService: ProcessService,
    private artistService: ArtistService,
    private timeDifferencePipe: TimeDifferencePipe
  ) {
    super();
  }

  ngOnInit(): void {
    this.primengConfig.ripple.set(true);
  }

  ngAfterViewInit(): void {
  }

  nodeSelect(event: any, processingStatus?: string) : void {
    if (event.node.data == undefined) {
      event.node.expanded = !event.node.expanded;
    } else if (processingStatus === this.PROGRESS_STATUS) {
      this.messageService.add({
        severity: "warn",
        summary: "Warninig",
        detail: "Another process is already running"
      })
    } else {
      console.log('Node select:' + event.node.data);
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

  onLazyLoad(event: any) {
    console.log('onLazyLoad')
    if (!this.tableRefreshed) {
      this.tableRefreshed = true;
      this.processService.refreshTable();
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

  onRefreshButton(event: any, pi: ProcessInfo) : void {
    event.preventDefault();
    this.action.next(ProcessorType[pi.processorType as keyof typeof ProcessorType]);
  }

  protected readonly JSON = JSON;

  getProcessDuration(pi: ProcessInfo): string | null {
    if (pi.processDetails && (pi.processDetails.length > 0)) {
      const endDate = pi.processingStatus === this.PROGRESS_STATUS ?
        new Date() :
        pi.processDetails[pi.processDetails.length - 1].updateDateTime
      return this.timeDifferencePipe.transform(pi.processDetails[0].updateDateTime, endDate)
    } else {
      return null
    }
  }
}
