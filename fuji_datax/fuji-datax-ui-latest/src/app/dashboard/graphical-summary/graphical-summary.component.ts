import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'graphical-summary',
    templateUrl: './graphical-summary.component.html',
    styles: ['.chart {display: block}']
})

export class GraphicalSummaryComponent {

    @Input() data: Object;
    @Input() selectedDuration:Object;

    @Output() widgetSelected: EventEmitter<any> = new EventEmitter();

    private colorMapping:Object = {"New":"#2D96D9","Assigned":"#2F4F4F","In-Progress":"#DE7528","Signed":"#75CAC2","Submitted-to-EMR":"#7AA242","Submitted-for-Attestation":"#a55a82","Attested":"#8e956a","My-QA-Reviews":"#266de0","QA-Assigned":"#266de0","My-QA-InProgress":"#f46b42","QA-InProgress":"#f46b42","QA-UnAssigned":"#129977"};
    private colors:Object[] = [{backgroundColor:[]}];

    // events
    public chartClicked(e:any):void {
        this.widgetSelected.emit({
            id: this.data["id"]
        });
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    ngOnChanges(){
      const that = this;
      setTimeout(function(){
        that.resizeWidgets();
      },0);

      var widgetColors = [];
      for (var index in this.data.status){
          var status = this.data.status[index];
          widgetColors.push(this.colorMapping[status]);
        }
        this.colors[0].backgroundColor = widgetColors;
    }

    resizeWidgets(){
      $('.graphical-summary').each(function(){
          var max = -1;
          $(this).find('.legends').each(function(){
              var h = $(this).height();
              max = h > max ? h : max;
          });
          $(this).find('.legends').css({"height":max});
      });

      $('.graphical-summary').each(function(){
          var max = -1;
          $(this).find('.panel-heading row').each(function(){
              var h = $(this).height();
              max = h > max ? h : max;
          });
          $(this).find('.panel-heading row').css({"height":max});
      });

      $('.graphical-summary').each(function(){
          var max = -1;
          $(this).find('.panel-footer row').each(function(){
              var h = $(this).height();
              max = h > max ? h : max;
          });
          $(this).find('.panel-footer row').css({"height":max});
      });
    }
}
