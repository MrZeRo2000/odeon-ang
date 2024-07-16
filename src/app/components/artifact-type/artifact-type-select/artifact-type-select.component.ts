import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ARTIFACT_MUSIC_TYPES, ARTIFACT_TYPE_GROUPS, ARTIFACT_VIDEO_TYPES} from "../../../model/artifacts";
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {tap} from "rxjs";


@Component({
  selector: 'app-artifact-type-select',
  templateUrl: './artifact-type-select.component.html',
  styleUrl: './artifact-type-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: ArtifactTypeSelectComponent
    },
  ]
})
export class ArtifactTypeSelectComponent implements ControlValueAccessor {
  readonly ARTIFACT_TYPE_GROUPS_MUSIC = [ARTIFACT_TYPE_GROUPS[0]]
  readonly ARTIFACT_TYPE_GROUPS_VIDEO = [ARTIFACT_TYPE_GROUPS[1]]
  readonly ARTIFACT_MUSIC_TYPES = ARTIFACT_MUSIC_TYPES
  readonly ARTIFACT_MUSIC_TYPE_CODES = this.ARTIFACT_MUSIC_TYPES.map(v => v.code)
  readonly ARTIFACT_VIDEO_TYPES = ARTIFACT_VIDEO_TYPES
  readonly ARTIFACT_VIDEO_TYPE_CODES = this.ARTIFACT_VIDEO_TYPES.map(v => v.code)
  readonly ARTIFACT_MUSIC_VIDEO_TYPE_CODES = this.ARTIFACT_MUSIC_TYPE_CODES.concat(this.ARTIFACT_VIDEO_TYPE_CODES)

  musicGroupValue: number | null = null
  videoGroupValue: number | null = null

  formGroup = this.fb.group({
    artifactTypeMusic: [[] as number[]],
    artifactTypeVideo: [[] as number[]],
  })

  formGroupChange$ = this.formGroup.valueChanges.pipe(
    tap(v => {
      const newMusicGroupValue = v?.artifactTypeMusic?.length === this.ARTIFACT_MUSIC_TYPES.length ?
        this.ARTIFACT_TYPE_GROUPS_MUSIC[0].code : null;
      if (newMusicGroupValue != this.musicGroupValue) {
        this.musicGroupValue = newMusicGroupValue
      }
      const newVideoGroupValue = v?.artifactTypeVideo?.length === this.ARTIFACT_VIDEO_TYPES.length ?
        this.ARTIFACT_TYPE_GROUPS_VIDEO[0].code : null;
      if (newVideoGroupValue != this.videoGroupValue) {
        this.videoGroupValue = newVideoGroupValue
      }
    }),
    tap(v => {
      this.markAsTouched()
      let value = (v?.artifactTypeMusic || []).concat(v?.artifactTypeVideo || [])
      if (value.length === 0) {
        value = this.ARTIFACT_MUSIC_VIDEO_TYPE_CODES
      }
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
    this.musicGroupValue = musicValue.length === this.ARTIFACT_MUSIC_TYPES.length ?
      this.ARTIFACT_TYPE_GROUPS_MUSIC[0].code : null;
    this.videoGroupValue = videoValue.length === this.ARTIFACT_VIDEO_TYPES.length ?
      this.ARTIFACT_TYPE_GROUPS_VIDEO[0].code : null;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  groupMusicClick(): void {
    const value= this.musicGroupValue ? this.ARTIFACT_MUSIC_TYPES.map(t => t.code) : []
    this.formGroup.controls.artifactTypeMusic.setValue(value);
  }

  groupVideoClick(): void {
    const value= this.videoGroupValue ? this.ARTIFACT_VIDEO_TYPES.map(t => t.code) : []
    this.formGroup.controls.artifactTypeVideo.setValue(value);
  }
}

