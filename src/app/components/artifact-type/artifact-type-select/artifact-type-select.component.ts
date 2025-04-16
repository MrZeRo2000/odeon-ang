import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ARTIFACT_MUSIC_TYPES, ARTIFACT_TYPE_GROUPS, ARTIFACT_VIDEO_TYPES} from "../../../model/artifacts";
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {tap} from "rxjs";


@Component({
    selector: 'app-artifact-type-select',
    templateUrl: './artifact-type-select.component.html',
    styleUrl: './artifact-type-select.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ArtifactTypeSelectComponent
        },
    ],
    standalone: false
})
export class ArtifactTypeSelectComponent implements ControlValueAccessor {
  readonly ARTIFACT_TYPE_GROUPS_MUSIC = [ARTIFACT_TYPE_GROUPS[0]]
  readonly ARTIFACT_TYPE_GROUPS_VIDEO = [ARTIFACT_TYPE_GROUPS[1]]
  readonly ARTIFACT_MUSIC_TYPES = ARTIFACT_MUSIC_TYPES
  readonly ARTIFACT_MUSIC_TYPE_CODES = this.ARTIFACT_MUSIC_TYPES.map(v => v.code)
  readonly ARTIFACT_VIDEO_TYPES = ARTIFACT_VIDEO_TYPES
  readonly ARTIFACT_VIDEO_TYPE_CODES = this.ARTIFACT_VIDEO_TYPES.map(v => v.code)
  readonly ARTIFACT_MUSIC_VIDEO_TYPE_CODES = this.ARTIFACT_MUSIC_TYPE_CODES.concat(this.ARTIFACT_VIDEO_TYPE_CODES)

  formGroup = this.fb.group({
    artifactTypeMusic: [[] as number[]],
    artifactTypeVideo: [[] as number[]],
  })

  formGroupChange$ = this.formGroup.valueChanges.pipe(
    tap(v => {
      console.debug(`formGroupChange: ${JSON.stringify(v)}`)
      this.markAsTouched()
      let value = (v?.artifactTypeMusic || []).concat(v?.artifactTypeVideo || [])
      /*
      if (value.length === 0) {
        value = this.ARTIFACT_MUSIC_VIDEO_TYPE_CODES
      }

       */
      this.onChange(value)
    }),
  )

  onChange = (value: number[]) => {};

  onTouched = () => {};

  touched = false;

  constructor(
    private fb: FormBuilder
  ) { }

  registerOnChange(onChange: any): void {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value?: number[]): void {
    const musicValue = value ?
      value.filter(v => this.ARTIFACT_MUSIC_TYPE_CODES.indexOf(v) > -1) : []
    const videoValue = value ?
      value.filter(v => this.ARTIFACT_VIDEO_TYPE_CODES.indexOf(v) > -1) : []
    this.formGroup.setValue({
      artifactTypeMusic: musicValue,
      artifactTypeVideo: videoValue
    })
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  groupMusicClick(event: any): void {
    event.preventDefault();
    const oldValue = this.formGroup.controls.artifactTypeMusic.value || [];

    let newValue: number[] = [];
    if (oldValue.length < this.ARTIFACT_MUSIC_TYPE_CODES.length) {
      newValue = this.ARTIFACT_MUSIC_TYPE_CODES
    }

    if (newValue.length != oldValue.length)  {
      this.formGroup.controls.artifactTypeMusic.setValue(newValue);
    }
  }

  groupVideoClick(event: any): void {
    event.preventDefault();
    const oldValue = this.formGroup.controls.artifactTypeVideo.value || [];

    let newValue: number[] = [];
    if (oldValue.length < this.ARTIFACT_VIDEO_TYPE_CODES.length) {
      newValue = this.ARTIFACT_VIDEO_TYPE_CODES
    }

    if (newValue.length != oldValue.length)  {
      this.formGroup.controls.artifactTypeVideo.setValue(newValue);
    }
  }
}

