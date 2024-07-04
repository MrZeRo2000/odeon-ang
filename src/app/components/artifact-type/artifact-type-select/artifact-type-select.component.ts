import { Component } from '@angular/core';
import {ARTIFACT_MUSIC_TYPES, ARTIFACT_TYPE_GROUPS, ARTIFACT_VIDEO_TYPES} from "../../../model/artifacts";

@Component({
  selector: 'app-artifact-type-select',
  templateUrl: './artifact-type-select.component.html',
  styleUrl: './artifact-type-select.component.scss'
})
export class ArtifactTypeSelectComponent {
  readonly ARTIFACT_TYPE_GROUPS = ARTIFACT_TYPE_GROUPS
  readonly ARTIFACT_TYPE_GROUPS_MUSIC = [ARTIFACT_TYPE_GROUPS[0]]
  readonly ARTIFACT_TYPE_GROUPS_VIDEO = [ARTIFACT_TYPE_GROUPS[1]]
  readonly ARTIFACT_MUSIC_TYPES = ARTIFACT_MUSIC_TYPES
  readonly ARTIFACT_VIDEO_TYPES = ARTIFACT_VIDEO_TYPES

}

