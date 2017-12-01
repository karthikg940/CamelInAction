import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { WorksheetData } from '../worksheet.model';

@Component({
    selector: 'worksheet-section',
    templateUrl: './worksheet.section.component.html',
    styleUrls: []
})

export class WorksheetSection {

    @Input() id: String;
    @Input() name: String;
    @Input() required: Boolean;
    @Input() data: Object = {};
    @Input() topics: Object[] = [];
    @Output() onUpdate: EventEmitter = new EventEmitter();
    @Input() qasign:boolean;
    ngOnInit(){
        this.initModel();
    }

    initModel(){
        if(!this.data){
            this.data = {};
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log("WorksheetSection ngOnChanges", changes);
        if(changes['data'])
            this.initModel();
    }

    public onChildChange(event){
        this.data[event.id] = event.data;
        this.publishChange();
    }

    publishChange(){
        this.onUpdate.emit(new WorksheetData(this.id,this.data));
    }

    ngAfterViewInit(){
        var id = this.id;
        $('#'+this.id).click(function(){
            var currentPanel = $(this).next('.wrkshtpanelbody');
            $('.wrkshtpanelbody').each(function(){
                if($(this).attr('id')!="panel-"+id){
                    $(this).slideUp();
                }
            });
            currentPanel.slideToggle();
        });
    }

}
