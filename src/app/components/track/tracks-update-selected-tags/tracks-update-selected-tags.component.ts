import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {Artifact} from "../../../model/artifacts";
import {Track, TrackSelectedTagsUserUpdate} from "../../../model/track";
import {FormBuilder} from "@angular/forms";
import {catchError, of, Subject, switchMap, tap} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {TrackService} from "../../../service/track.service";
import {filterString} from "../../../utils/search-utils";
import {ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-tracks-update-selected-tags',
  templateUrl: './tracks-update-selected-tags.component.html',
  styleUrl: './tracks-update-selected-tags.component.css',
  standalone: false
})
export class TracksUpdateSelectedTagsComponent extends BaseFormComponent {
  @ViewChild('autofocused', { static: false}) autoFocused!: any;

  @Input()
  public artifact!: Artifact;

  @Input()
  public tracks!: Array<Track>;

  @Input()
  tags: Array<string> = []

  @Output()
  public onImport: EventEmitter<void> = new EventEmitter();

  editForm = this.fb.group({
    tags: this.fb.control([] as string[])
  })

  filteredTags: Array<string> = [];

  updateSubject = new Subject<TrackSelectedTagsUserUpdate>();

  update$ = this.updateSubject.asObservable().pipe(
    switchMap(v => this.trackService.updateSelectedTags(v).pipe(
      tap(r => {
        this.messageService.add({severity:'success', summary:'Success', detail:`Updated ${r.rowsAffected} tracks`});
        this.onImport.next()
      }),
      catchError(error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Error executing update`});
        const errorMessage = error.error?.message
        if (errorMessage) {
          this.messageService.add({severity:'error', summary:'Details', detail:errorMessage});
        }
        return of(undefined);
      })
    ))
  )

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private trackService: TrackService,
    private confirmationService: ConfirmationService,
  ) {
    super();
  }

  searchTags(event: any): void {
    this.filteredTags = filterString(this.tags, event.query);
  }

  tagsKeyUp(event: any): void {
    if (
      (event.keyCode == ENTER) &&
      !!event.target.value &&
      this.editForm.value.tags?.indexOf(event.target.value) === -1
    ) {
      console.log(`Selected ${event.target.value}`);
      const value = event.target.value;

      this.confirmationService.confirm({
        key: "tags",
        target: event.target,
        message: `Are you sure that you want to add ${value}?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.filteredTags.push(value);
          this.editForm.value.tags?.push(value);
          event.target.value = '';
          event.target.focus();
        }
      });
    }
  }

  onShow() {
    setTimeout(() => {
      this.autoFocused?.el.nativeElement.querySelector('span').focus();
    }, 200)
  }

  private getFormData(): TrackSelectedTagsUserUpdate {
    return {
      artifact: this.artifact as Artifact,
      trackIds: this.tracks.map(v => v.id),
      tags: this.editForm.value.tags || [],
    } as TrackSelectedTagsUserUpdate
  }

  execute(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.updateSubject.next(this.getFormData())
    }
  }
}
