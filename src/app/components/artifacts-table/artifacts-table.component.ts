import {Component, OnInit} from '@angular/core';
import {ArtifactService} from "../../service/artifact.service";
import {FormBuilder} from "@angular/forms";
import {ARTIST_TYPES, ArtistEditItem, ArtistIdName} from "../../model/artists";
import {ARTIFACT_TYPES, ArtifactEditItem, ArtifactTableItem} from "../../model/artifacts";
import {catchError, finalize, forkJoin, iif, map, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {ArtistService} from "../../service/artist.service";
import {Router} from "@angular/router";
import {BaseTableComponent} from "../base/base-table.component";

@Component({
  selector: 'app-artifacts-table',
  templateUrl: './artifacts-table.component.html',
  styleUrls: ['./artifacts-table.component.scss']
})
export class ArtifactsTableComponent extends BaseTableComponent<ArtifactTableItem> implements OnInit {
  readonly ARTIST_TYPES =  ARTIST_TYPES;
  readonly ARTIFACT_TYPES = ARTIFACT_TYPES;

  CRUDAction = CRUDAction;

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
    tap(v => this.selectedItem = undefined)
  )

  deleteAction$ = this.deleteSubject.asObservable().pipe(
    switchMap(v =>
      this.deleteArtifact(v.data.id as number)
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

  editAction$ = this.editSubject.asObservable().pipe(
    switchMap(v =>
      forkJoin([
        this.getArtists(),
        iif(() => Object.keys(v).length === 0, of({} as ArtifactEditItem), this.getArtifact(v.id))
      ])
    ),
    tap(v => {this.displayForm = v[1].id !== -1 && v[0].length > 0;})
  )

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private artistService: ArtistService,
    private artifactService: ArtifactService
  ) {
    super()
  }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  onCompositionsButton(event: any): void {
    this.router.navigate([`/compositions/${this.selectedItem?.id}`]);
  }

  onMediaFilesButton(event: any): void {
    this.router.navigate([`/media-files/${this.selectedItem?.id}`]);
  }

  crudEvent(event: any): void {
    console.log(`CRUD event: ${JSON.stringify(event)}`);
    if (event.action === CRUDAction.EA_DELETE) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete <strong> ${event.data.artistName} - ${event.data.title}(${event.data.year})</strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteSubject.next({action: CRUDAction.EA_DELETE, data: event.data})
        }
      });
    } else if (event.action === CRUDAction.EA_CREATE) {
      this.editSubject.next({} as ArtifactTableItem)
    } else if (event.action === CRUDAction.EA_UPDATE) {
      this.editSubject.next(event.data)
    }
  }

  deleteArtifact(id: number): Observable<CRUDResult<void>> {
    return this.artifactService.deleteArtifact(id).pipe(
      map(_ => {return {success: true} as CRUDResult<void>}),
      catchError(err => of({success: false, data: err.error?.message || err.message}))
    )
  }

  override savedEditData(event: any): void {
    super.savedEditData(event);
    this.filterForm.setValue(this.filterForm.value);
  }

  getArtifact(id: number): Observable<ArtifactEditItem> {
    return this.artifactService.get(id).pipe(
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artifact details: ${err.error?.message || err.message}`
        });
        return of({id: -1} as ArtifactEditItem);
      })
    )
  }

  getArtists(): Observable<Array<ArtistIdName>> {
    return this.artistService.getArtistsIdName().pipe(
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error getting artists: ${err.error?.message || err.message}`
        });
        return of([]);
      })
    )
  }

}