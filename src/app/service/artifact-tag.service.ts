import { Injectable } from '@angular/core';
import {CRUDService} from "./crud.service";
import {Artifact} from "../model/artifacts";
import {RestDataSourceService} from "../data-source/rest-data-source.service";

@Injectable({
  providedIn: 'root'
})
export class ArtifactTagService extends CRUDService<Artifact> {

  constructor(restDataSource: RestDataSourceService) {
    super(restDataSource, "artifact/update-tags")
  }
}
