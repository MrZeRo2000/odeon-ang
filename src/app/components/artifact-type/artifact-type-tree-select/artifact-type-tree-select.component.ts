import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TreeNodeSelectEvent} from "primeng/tree";
import {ARTIFACT_MUSIC_TYPES, ARTIFACT_VIDEO_TYPES} from "../../../model/artifacts";

@Component({
  selector: 'app-artifact-type-tree-select',
  templateUrl: './artifact-type-tree-select.component.html',
  styleUrl: './artifact-type-tree-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ArtifactTypeTreeSelectComponent
    },
  ],
  standalone: false
})
export class ArtifactTypeTreeSelectComponent implements ControlValueAccessor {
  nodes1 = {
    key: '0',
    label: 'Music',
    data: 'Music Folder',
    icon: 'pi pi-fw pi-headphones',
    children: [
      {
        key: '0-0',
        label: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
      }]
  }

  nodes = [
    {
    key: '0',
    label: 'Music',
    data: '100',
    icon: 'pi pi-fw pi-headphones',
    children:
      ARTIFACT_MUSIC_TYPES.map(v => {
        return {
          key: '0-' + (v.code-101).toString(),
          label: v.name,
          data: v.code.toString()}
      })
    },
    {
      key: '1',
      label: 'Video',
      data: '200',
      icon: 'pi pi-fw pi-video',
      children:
        ARTIFACT_VIDEO_TYPES.map(v => {
          return {
            key: '1-' + (v.code-201).toString(),
            label: v.name,
            data: v.code.toString()}
        })
    }
  ]

  selectedNodes: any[] = []


  onNodeSelectionChanged(event : TreeNodeSelectEvent) {
    console.log(`node select event: ${JSON.stringify(event.node.key)}, selected nodes: ${this.selectedNodes.length}`);
    this.markAsTouched()
    const value = this.selectedNodes.filter(v => v.key.length > 1).map(v => parseInt(v.data))
    this.onChange(value)
  }

  onChange = (value: number[]) => {};

  onTouched = () => {};

  touched = false;

  registerOnChange(onChange: any): void {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value?: number[]): void {
    if ((!value) || (value.length == 0)) {
      this.selectedNodes = []
    } else {
      const selectedData = value.map(v => v.toString());
      this.selectedNodes = this.nodes
        .flatMap(v => v.children)
        .filter(v => selectedData.indexOf(v.data) > -1);
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
