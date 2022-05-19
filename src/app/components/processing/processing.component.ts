import { Component, OnInit } from '@angular/core';
import {PROCESSOR_TYPE_NAMES, ProcessorType} from "../../model/processor-type";
import {ConfirmationService, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
  providers: [ConfirmationService]
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

  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  nodeSelect(event: any) : void {
    if (event.node.data == undefined) {
      event.node.expanded = !event.node.expanded;
    } else {
      console.log('Note select:' + event.node.data);
      const processorAction: ProcessorType = event.node.data;
      this.confirmationService.confirm({
        message: `Are you sure that you want to execute <strong> ${PROCESSOR_TYPE_NAMES[processorAction]}</strong>?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          //Actual logic to perform a confirmation
        }
      });
    }
  }

}
