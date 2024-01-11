import { Pipe, PipeTransform } from '@angular/core';
import {Artifact} from "../../model/artifacts";

@Pipe({
  name: 'artifactCaption'
})
export class ArtifactCaptionPipe implements PipeTransform {

  transform(value: Artifact): string {
    return !!value.artist?.artistName && !!value.year ? `${value.artist?.artistName} - ${value.title} (${value.year})` : value.title;
  }

}
