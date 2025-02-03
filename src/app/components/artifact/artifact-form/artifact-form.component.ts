import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ARTIFACT_MUSIC_TYPES,
  ArtifactConfigItem, getArtifactConfig, Artifact
} from "../../../model/artifacts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArtifactService} from "../../../service/artifact.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {IdName} from "../../../model/common";
import {BaseCrudFormComponent} from "../../base/base-crud-form.component";
import {filterIdName} from "../../../utils/search-utils";
import {MediaFileService} from "../../../service/media-file.service";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {MediaFile} from "../../../model/media-file";

@Component({
    selector: 'app-artifact-form',
    templateUrl: './artifact-form.component.html',
    styleUrls: ['./artifact-form.component.scss'],
    standalone: false
})
export class ArtifactFormComponent extends BaseCrudFormComponent<Artifact> implements OnInit {
  @ViewChild('autofocused', { static: false}) autoFocused!: any;

  readonly ARTIFACT_TYPES = ARTIFACT_MUSIC_TYPES;

  @Input()
  artists: Array<IdName> = [];

  @Input()
  artistTypeCode: string = 'A';

  filteredArtists: Array<IdName> = [];
  filteredPerformerArtists: Array<IdName> = [];

  isSelectableArtifactTypeId(artifactTypeId: number) : boolean {
    return this.ARTIFACT_TYPES.map(v => v['code']).indexOf(artifactTypeId) !== -1;
  }

  artifactTypeConfig?: ArtifactConfigItem;

  editForm: FormGroup = this.fb.group({});

  sizeDurationSubject: Subject<number> = new Subject<number>();

  sizeDurationAction$ = this.sizeDurationSubject.asObservable().pipe(
    switchMap(v => {
      return this.mediaFileService.getTable(v).pipe(
        switchMap(v => {return of(
          v.reduce<MediaFile>((p: MediaFile, c:MediaFile) => {
            return {size: p.size + (c.size ?? 0), duration: p.duration + (c.duration ?? 0)} as MediaFile
          }, {size: 0, duration: 0} as MediaFile)
        )}),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error getting size and duration information`
          });
          return of({} as MediaFile);
        })
      )
    }),
    tap(v => {
      if (!!v) {
        if (v.size) {
          this.editForm.patchValue({"size": v.size})
        }
        if (v.duration) {
          this.editForm.patchValue({"duration": v.duration})
        }
        if (v.size || v.duration) {
          this.messageService.add({
            severity: 'success',
            summary: 'Info',
            detail: `Updated size and duration`
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: `Size and duration info not found`
          });
        }
      }
    })
  )

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    override messageService: MessageService,
    private artifactService: ArtifactService,
    private mediaFileService: MediaFileService,
  ) { super(messageService, artifactService) }

  ngOnInit(): void {
    this.artifactTypeConfig = getArtifactConfig(this.editItem?.artifactType?.id as number, this.artistTypeCode);
    console.log(`ArtifactForm: onInit: config: ${JSON.stringify(this.artifactTypeConfig)}`);
    this.editForm = this.fb.group({
      artifactTypeId: ['', Validators.required],
      artistId: ['', this.artifactTypeConfig?.requiresArtist ? Validators.required : null],
      performerArtistId: ['', this.artifactTypeConfig?.requiresPerformerArtist? Validators.required : null],
      title: ['', Validators.required],
      year: ['', this.artifactTypeConfig?.requiresYear? Validators.required : null],
      duration: [''],
      size: ['']
    });

    this.editForm.setValue({
      artifactTypeId: this.editItem?.artifactType?.id?? '',
      artistId: this.editItem?.artist? {id: this.editItem.artist.id, name: this.editItem.artist.artistName} : '',
      performerArtistId: this.editItem?.performerArtist? {id: this.editItem.performerArtist.id, name: this.editItem.performerArtist.artistName} : '',
      title: this.editItem?.title?? '',
      year: this.editItem?.year?? '',
      duration: this.editItem?.duration?? '',
      size: this.editItem?.size?? '',
    })

  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.el.nativeElement.querySelector('input').focus();
    }, 200)
  }

  override validate(): boolean {
    return this.editForm.valid;
  }

  createSavedItem(): Artifact {
    return {
      id: this.editItem?.id,
      artifactType: {id: this.editForm.value.artifactTypeId} as IdName,
      artist: {id: this.editForm.value.artistId?.id, artistName: this.editForm.value.artistId?.name},
      performerArtis: {id: this.editForm.value.performerArtistId?.id, artistName: this.editForm.value.performerArtistId?.name},
      title: this.editForm.value.title,
      year: this.editForm.value.year,
      duration: this.editForm.value.duration,
      size: this.editForm.value.size
    } as Artifact;
  }


  searchArtists(event: any): void {
    this.filteredArtists = filterIdName(this.artists, event.query)
  }

  searchPerformerArtists(event: any): void {
    this.filteredPerformerArtists = filterIdName(this.artists, event.query)
  }

  onUpdateSizeDuration(event: any): void {
    event.preventDefault();
    if (this.editItem?.id) {
      this.sizeDurationSubject.next(this.editItem?.id as number)
    }
  }
}
