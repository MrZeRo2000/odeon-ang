import {MessageService} from "primeng/api";

export abstract class BaseTableComponent <T extends {id?: number}> {
  errorObject: any = undefined;

  globalFilterValue = '';

  first: number = 0;

  protected abstract loadData(): void;

  protected constructor(
    protected messageService: MessageService,
  ) { }
}
