import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorksheetData } from '../../../worksheet.model';
import { QAWorksheetData } from '../../../worksheet.model';
@Component({
    selector: 'option-qa-text',
    templateUrl: './worksheet.option.qa-text.component.html',
    styleUrls: []
})
export class OptionQaText {


    @Input() qaLabel: String;
    @Input() qaId: String;
    @Input() id: String;
    @Input() qaData: Object;
    @Input() workflowStatus: boolean;
    @Input() disableQAWorksheet: boolean;
    @Output() onQAUpdate: EventEmitter = new EventEmitter();
    @Input() qasign: boolean;

    public onQAChange(qaValue){
    	console.log("GGGGGGGGGG",qaValue);
        this.qaData = qaValue;
        this.publishQAChange();
    }

    publishQAChange(){
        this.onQAUpdate.emit({
            qaId: 'qaValue',
            qaData: this.qaData
        });
    }

}
