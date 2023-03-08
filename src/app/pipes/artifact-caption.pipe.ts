import { Pipe, PipeTransform } from '@angular/core';
import {ArtifactEditItem} from "../model/artifacts";

@Pipe({
  name: 'artifactCaption'
})
export class ArtifactCaptionPipe implements PipeTransform {

  transform(value: ArtifactEditItem): string {
    return !!value.artistName && !!value.year ? `${value.artistName} - ${value.title} (${value.year})` : value.title;
  }

}
