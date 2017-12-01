import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { WorksheetData } from '../../worksheet.model';
@Component({
    selector: 'worksheet-topic',
    templateUrl: './worksheet.topic.component.html',
    styleUrls: []
})
export class WorksheetTopic {

    @Input() type: String;
    @Input() name: String;
    @Input() id: String;
    @Input() columnLayout: number =0;
    @Input() data: Object = {};
    @Input() options: Object[] = [];
    @Input() topics: Object[];
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

}
