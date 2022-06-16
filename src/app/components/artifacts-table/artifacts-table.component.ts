import {Component, OnInit} from '@angular/core';
import {ArtifactService} from "../../service/artifact.service";
import {FormBuilder} from "@angular/forms";
import {ARTIST_TYPES} from "../../model/artists";
import {ARTIFACT_TYPES, ArtifactEditItem, ArtifactTableItem} from "../../model/artifacts";
import {catchError, finalize, iif, map, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";

@Component({
  selector: 'app-artifacts-table',
  templateUrl: './artifacts-table.component.html',
  styleUrls: ['./artifacts-table.component.scss']
})
export class ArtifactsTableComponent implements OnInit {
  readonly ARTIST_TYPES =  ARTIST_TYPES;
  readonly ARTIFACT_TYPES = ARTIFACT_TYPES;

  CRUDAction = CRUDAction;

  errorObject: any = undefined;

  filterForm = this.fb.group({
    artistType: [ARTIST_TYPES[0].code],
    artifactTypes: [[ARTIFACT_TYPES[0].code, ARTIFACT_TYPES[1].code]]
  })

  artifactTable$ = (v: any) => this.artifactService.getArtifactTable(v.artistType, v.artifactTypes).pipe(
    catchError(err => {
      this.errorObject = err;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error reading artifacts`
      });
      return of([]);
    })
  );

  filteredArtifacts$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    tap(v => console.log(`Reading filtered artifacts, artist type: ${JSON.stringify(v.artistType)}, artifact types: ${JSON.stringify(v.artifactTypes)}`)),
    switchMap(
      v => iif(
        () =>  v.artifactTypes.length ===0,
        of([]),
        this.artifactTable$(v)
      )
    ),
    tap(v => console.log(`Returned: ${JSON.stringify(v)}`))
  )

  globalFilterValue = '';

  selectedArtifact: ArtifactTableItem = {} as ArtifactTableItem;

  private crudOperationSubject: Subject<CRUDOperation<ArtifactEditItem | ArtifactTableItem>> = new Subject<CRUDOperation<ArtifactEditItem | ArtifactTableItem>>();

  crudOperationAction$ = this.crudOperationSubject.asObservable().pipe(
    switchMap(v =>
      iif(() => v.action === CRUDAction.EA_DELETE, this.deleteArtifact(v.data.id as number),
        //iif(() => v.action === CRUDAction.EA_CREATE, this.artifactService.createArtifact(v.data as ArtifactEditItem),
          //iif(() => v.action === CRUDAction.EA_UPDATE, this.artifactService.updateArtifact(v.data as ArtifactEditItem),
            of(undefined))
    ),
    tap(v => console.log(`Got some result: ${JSON.stringify(v)}`)),
    tap(v => {
      if (v?.success) {
        this.filterForm.setValue(this.filterForm.value);
      } else if (!!v) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error: ${v.data}`
        });
      }
    })
  );

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private artifactService: ArtifactService
  ) { }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  crudEvent(event: any): void {
    console.log(`CRUD event: ${JSON.stringify(event)}`);
    if (event.action === CRUDAction.EA_DELETE) {

      this.confirmationService.confirm({
        message: `Are you sure that you want to delete <strong> ${event.title}</strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.crudOperationSubject.next({action: CRUDAction.EA_DELETE, data: event.data})
        }
      });
    }
  }

  deleteArtifact(id: number): Observable<CRUDResult<void>> {
    return this.artifactService.deleteArtifact(id).pipe(
      map(v => {return {success: true} as CRUDResult<void>}),
      catchError(err => of({success: false, data: err.error?.message || err.message}))
    )
  }

}
