import { Component, OnInit } from '@angular/core';
import {BaseTableComponent} from "../base/base-table.component";
import {ArtistLyricsTableItem} from "../../model/artist-lyrics";
import {ConfirmationService, MessageService} from "primeng/api";
import {ArtistLyricsService} from "../../service/artist-lyrics.service";
import {CRUDAction, CRUDOperation, CRUDResult} from "../../model/crud";
import {catchError, map, Observable, of, tap} from "rxjs";
import {MediaFileTableItem} from "../../model/media-file";

export interface NameInterface {
  name: string
}

@Component({
  selector: 'app-artist-lyrics-table',
  templateUrl: './artist-lyrics-table.component.html',
  styleUrls: ['./artist-lyrics-table.component.scss']
})
export class ArtistLyricsTableComponent extends BaseTableComponent<ArtistLyricsTableItem> implements OnInit {
  CRUDAction = CRUDAction;

  data$?: Observable<[Array<ArtistLyricsTableItem>, NameInterface[]]>;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private artistLyricsService: ArtistLyricsService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.data$ = this.getData();
  }

  private getData(): Observable<[Array<ArtistLyricsTableItem>, NameInterface[]]> {
    return this.artistLyricsService.getTable().pipe(
      map(v => {
        return [
          v,
          [... new Set(v.map(v => v.artistName))].map(v => <NameInterface>{name: v})] as [Array<ArtistLyricsTableItem>, NameInterface[]];
      }),
      catchError(err => {
        this.errorObject = err;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error reading lyrics`
        });
        return of([[], []] as [Array<ArtistLyricsTableItem>, NameInterface[]]);
      })
    );
  }

  crudEvent(event: any): void {
    if (event.action === CRUDAction.EA_DELETE) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete <strong> ${event.data.artistName} - ${event.data.title} </strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteSubject.next({action: event.action, data: event.data})
        }
      });
    } else if (event.action === CRUDAction.EA_CREATE) {
      this.editSubject.next({} as ArtistLyricsTableItem)
    } else if (event.action === CRUDAction.EA_UPDATE) {
      this.editSubject.next(event.data)
    }
  }

  onFilter(event: any): void {
    this.globalFilterValue = event.filters?.global?.value || '';
  }

}
