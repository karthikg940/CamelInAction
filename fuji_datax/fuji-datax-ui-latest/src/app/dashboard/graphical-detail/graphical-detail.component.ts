import { Component, Input } from '@angular/core';
import { IOptions } from './graphical-detail.model';

@Component({
    selector: 'graphical-detail',
    templateUrl: './graphical-detail.component.html',
    styleUrls:['graphical-detail.component.css']
})

export class GraphicalDetailComponent {

    @Input() labels: string[];
    @Input() datasets:Object[];

    private colorMapping:Object = {"New":"#2D96D9","Assigned":"#2F4F4F","In-Progress":"#DE7528","Signed":"#75CAC2","Submitted-to-EMR":"#7AA242","Submitted-for-Attestation":"#a55a82","Attested":"#8e956a","My-QA-Reviews":"#266de0","QA-Assigned":"#266de0","My-QA-InProgress":"#f46b42","QA-InProgress":"#f46b42","QA-UnAssigned":"#129977"};
    public colors:Object[] = [];
    public legend:boolean = false;

    public options:IOptions =  {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true,
                ticks:{
                    /*min:0,
                    max:100,
                    stepSize:20*/
                	beginAtZero : true
                }
            }]
        }
    };

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    ngOnChanges(){
      const that = this;
      var widgetColors = [];
      if(this.datasets.length == 0) {
      this.datasets = [
      {
        data:[0]
      }
      ];
      }
      for (var barcolor of this.datasets){
        var status = barcolor.label;
        widgetColors.push({'backgroundColor':this.colorMapping[status]});
      }
      this.colors = widgetColors ;
      console.log("colors are",this.colors)
    }

    constructor(){
    }

}
