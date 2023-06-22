import {Component, Input} from '@angular/core';
import {BaseFormComponent} from "../base/base-form.component";
import {ImportStats} from "../../model/dv-product";

@Component({
  selector: 'app-dvproducts-import-result-form',
  templateUrl: './dvproducts-import-result-form.component.html',
  styleUrls: ['./dvproducts-import-result-form.component.scss']
})
export class DVProductsImportResultFormComponent extends BaseFormComponent {

  @Input()
  importStats: ImportStats = {} as ImportStats

}
