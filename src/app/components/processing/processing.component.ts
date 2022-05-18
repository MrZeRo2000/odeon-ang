import { Component, OnInit } from '@angular/core';

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
          data: "ARTISTS",
          leaf: true
        }
      ]
    },
    {
      label: "Validate",
      children: [
        {
          label: "MP3",
          data: "MP3_VALIDATE",
          leaf: true
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  nodeSelect(event: any) : void {
    if (!event.node.data) {
      event.node.expanded = !event.node.expanded;
    } else {
      console.log('Note select:' + event.node.data);
    }
  }

}
