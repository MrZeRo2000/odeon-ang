import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ARTIFACT_MUSIC_TYPES, ARTIFACT_TYPE_GROUPS, ARTIFACT_VIDEO_TYPES} from "../../../model/artifacts";
import {ControlValueAccessor, FormBuilder} from "@angular/forms";
import {pairwise, startWith, tap} from "rxjs";


@Component({
  selector: 'app-artifact-type-select',
  templateUrl: './artifact-type-select.component.html',
  styleUrl: './artifact-type-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtifactTypeSelectComponent implements ControlValueAccessor {
  readonly ARTIFACT_TYPE_GROUPS = ARTIFACT_TYPE_GROUPS
  readonly ARTIFACT_TYPE_GROUPS_MUSIC = [ARTIFACT_TYPE_GROUPS[0]]
  readonly ARTIFACT_TYPE_GROUPS_VIDEO = [ARTIFACT_TYPE_GROUPS[1]]
  readonly ARTIFACT_MUSIC_TYPES = ARTIFACT_MUSIC_TYPES
  readonly ARTIFACT_VIDEO_TYPES = ARTIFACT_VIDEO_TYPES

  formGroup = this.fb.group({
    artifactTypeGroupMusic: [null as null | number],
    artifactTypeMusic: [[] as number[]],
    artifactTypeGroupVideo: [[] as number[]],
    artifactTypeVideo: [[] as number[]],
  })

  selectedArtifactTypes$ = this.formGroup.valueChanges.pipe(
    startWith(this.formGroup.value),
    pairwise(),
    tap(v => console.log(`Value changes: ${JSON.stringify(v)}`)),
    tap(v => {
      const p = v[0]
      const c = v[1]
      if (p.artifactTypeGroupMusic !== c.artifactTypeGroupMusic) {
        const value= c.artifactTypeGroupMusic ? this.ARTIFACT_MUSIC_TYPES.map(t => t.code) : []
        this.formGroup.controls.artifactTypeMusic.setValue(value);
      }
    })
  )

  groupMusicChange$ = this.formGroup.controls.artifactTypeGroupMusic.valueChanges.pipe(
    tap(v => {
      const value= v ? this.ARTIFACT_MUSIC_TYPES.map(t => t.code) : []
      this.formGroup.controls.artifactTypeMusic.setValue(value);
    })
  )

  musicChange$ = this.formGroup.controls.artifactTypeMusic.valueChanges.pipe(
    tap(v => {
      console.log(`MusicChange value: ${JSON.stringify(v)}`)

      const value = v && v.length === this.ARTIFACT_MUSIC_TYPES.length ?
        this.ARTIFACT_TYPE_GROUPS_MUSIC[0].code : null
    })
  )

  groupVideoChange$ = this.formGroup.controls.artifactTypeGroupVideo.valueChanges.pipe(
    tap(v => {
      const value= v ? this.ARTIFACT_VIDEO_TYPES.map(t => t.code) : []
      this.formGroup.controls.artifactTypeVideo.setValue(value);
    })
  )

  onTouched = () => {};

  touched = false;


  constructor(
    private fb: FormBuilder
  ) { }

  registerOnChange(onChange: any): void {
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

