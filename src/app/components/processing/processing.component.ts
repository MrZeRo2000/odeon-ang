import { Component, OnInit } from '@angular/core';
import {PROCESSOR_TYPE_NAMES, ProcessorType} from "../../model/processor-type";

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {
  readonly treeValues = [
    {
      label: "Import",
      selectable: true,
      children: [
        {
          label: "Artists",
          data: ProcessorType.ARTISTS_IMPORTER,
          leaf: true
        }
      ]
    },
    {
      label: "Validate",
      children: [
        {
          label: "MP3",
          data: ProcessorType.MP3_VALIDATOR,
          leaf: true
        },
        {
          label: "LA",
          data: ProcessorType.LA_VALIDATOR,
          leaf: true
        }
      ]
    },
    {
      label: "Load",
      children: [
        {
          label: "MP3",
          data: ProcessorType.MP3_LOADER,
          leaf: true
        },
        {
          label: "LA",
          data: ProcessorType.LA_LOADER,
          leaf: true
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  nodeSelect(event: any) : void {
    if (event.node.data == undefined) {
      event.node.expanded = !event.node.expanded;
    } else {
      console.log('Note select:' + event.node.data);
    }
  }

}
