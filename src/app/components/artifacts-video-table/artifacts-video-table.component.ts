import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {
  ARTIFACT_MUSIC_TYPE_MP3,
  ARTIFACT_TYPE_VIDEO, ARTIFACT_VIDEO_TYPE_MUSIC,
  ARTIFACT_VIDEO_TYPES,
  ArtifactEditItem,
  ArtifactTableItem
} from "../../model/artifacts";
import {IdName} from "../../model/common";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistService} from "../../service/artist.service";
import {ArtifactService} from "../../service/artifact.service";
import {CRUDResult} from "../../model/crud";
import {catchError, forkJoin, iif, map, Observable, of, startWith, switchMap, tap} from "rxjs";
import {ARTIST_TYPE_CODE_ARTIST, ARTIST_TYPES} from "../../model/artists";

interface FilterControlsConfig
{
  artifactType: [number]
}

@Component({
  selector: 'app-artifacts-video-table',
  templateUrl: './artifacts-video-table.component.html',
  styleUrls: ['./artifacts-video-table.component.scss']
})
export class ArtifactsVideoTableComponent extends BaseTableComponent<ArtifactTableItem, [IdName[], ArtifactEditItem]> implements OnInit {
  private static readonly SESSION_KEY = "artifacts-video-table-filter-form";

  readonly ARTIFACT_TYPE_VIDEO = ARTIFACT_TYPE_VIDEO;

  readonly ARTIFACT_VIDEO_TYPES = ARTIFACT_VIDEO_TYPES;

  readonly ARTIST_TYPE_CODE_ARTIST = ARTIST_TYPE_CODE_ARTIST;

  filterForm = this.fb.group(ArtifactsVideoTableComponent.getControlsConfig());

  artifactTable$ = (v: any) => this.artifactService.getTable(ARTIST_TYPE_CODE_ARTIST, [v.artifactType]).pipe(
    tap(v => `getting table with ${v}`),
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
    tap(v => {
      console.log(`Got: ${JSON.stringify(v)}`);
      sessionStorage.setItem(ArtifactsVideoTableComponent.SESSION_KEY, JSON.stringify(v))
    }),
    switchMap(
      v => iif(
        () => !v.artifactType,
        of([]),
        this.artifactTable$(v)
      )
    ),
    tap(v => {
      console.log(`End of filteredArtifacts with data: ${JSON.stringify(v)}`)
      this.selectedItem = undefined;
    })
  );

  private static getControlsConfig(): FilterControlsConfig {
    try {
      const savedState = sessionStorage.getItem(ArtifactsVideoTableComponent.SESSION_KEY);
      const savedObject = JSON.parse(savedState as string);
      return {
        artifactType: [savedObject.artifactType as number]
      }
    } catch (e)  {
      return {
        artifactType: [ARTIFACT_VIDEO_TYPES[0].code]
      }
    }
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    messageService: MessageService,
    confirmationService: ConfirmationService,
    private artistService: ArtistService,
    private artifactService: ArtifactService
  ) {
    super(
      messageService,
      confirmationService,
      artifactService,
      {
        deleteConfirmation: "`Are you sure that you want to delete <strong> ${event.data.artistName} - ${event.data.title}(${event.data.year})</strong>?`",
        deleteErrorMessage: "`Error deleting artifact: ${v.data}`",
        editErrorMessage: "`Error getting artifact details: ${err.error?.message || err.message}`"
      }
    )
  }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

  protected loadData(): void {
    console.log(`Load data filter value: ${JSON.stringify(this.filterForm.value)}`)
    //this.filterForm.setValue(this.filterForm.value);
  }

  protected getEditData(item: ArtifactTableItem): Observable<CRUDResult<[IdName[], ArtifactEditItem]>> {
    return forkJoin([
      this.getArtists(),
      iif(() => Object.keys(item).length === 0, of({artifactTypeId: ARTIFACT_VIDEO_TYPE_MUSIC} as ArtifactEditItem), this.getArtifact(item.id))
    ]).pipe(
      map(v => {return {success: true, data: v as [IdName[], ArtifactEditItem]}}),
      catchError(err => {
        return of({success: false, data: err.error?.message || err.message});
      })
    )
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

  getArtists(): Observable<Array<IdName>> {
    return this.artistService.getIdNameTable(ARTIST_TYPE_CODE_ARTIST).pipe(
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
