import {Component, Input} from '@angular/core';
import {BaseFormComponent} from "../../base/base-form.component";
import {ImportStats} from "../../../model/user-import";

@Component({
  selector: 'app-dvproducts-import-result-form',
  templateUrl: './user-import-result-form.component.html',
  styleUrls: ['./user-import-result-form.component.scss']
})
export class UserImportResultFormComponent extends BaseFormComponent {

  @Input()
  importStats: ImportStats = {} as ImportStats

}
