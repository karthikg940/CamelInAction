import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
//import { WorksheetQaData } from '../worksheet.section.quality-assurance.model';
import { WorksheetData } from '../../worksheet.model';
import { QAWorksheetData } from '../../worksheet.model';
@Component({
    selector: 'worksheet-qa-topic',
    templateUrl: './worksheet.qa-topic.component.html',
    styleUrls: []
})
export class QaWorksheetTopic {


    @Input() qaData: Object = {};
    @Input() qaId: String;
    @Input() id: String;
    @Input() qaName: String;
    @Input() qaRequired: Boolean;
    @Input() qaType: String ;
    @Input() qaColumnLayout: number;
    @Input() qaOptions: Object[] = [];
    @Output() onQAUpdate: EventEmitter = new EventEmitter();
    @Input() workflowStatus: boolean;
    @Input() disableQAWorksheet: boolean;
    @Input() qasign:boolean;

    ngOnInit(){
        this.initModel();
    }

    initModel(){
        if(!this.qaData){
            this.qaData = {};
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['qaData'])
            this.initModel();
    }

    public onQAChildChange(event){
    	 console.log("TOPIC QA DATA", event);
        this.qaData[event.qaId] = event.qaData;
        this.publishQAChange();
    }

    publishQAChange(){
    	console.log("topic emit",this.qaId)
        this.onQAUpdate.emit(new QAWorksheetData(this.qaId,this.qaData));
    }
}
