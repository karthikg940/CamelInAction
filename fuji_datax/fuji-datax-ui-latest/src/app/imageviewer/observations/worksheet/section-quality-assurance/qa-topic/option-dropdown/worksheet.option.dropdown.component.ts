import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { WorksheetData } from '../../../worksheet.model';
import { QAWorksheetData } from '../../../worksheet.model';
@Component({
    selector: 'option-dropdown',
    templateUrl: './worksheet.option.dropdown.component.html',
    styleUrls: []
})
export class OptionDropDown {

    @Input() qaId: String;
    @Input() id: String;
    @Input() qaData: Object;
    @Input() qaOptions: Object[] = [];
    @Input() qaColumnLayout: number;
    @Input() workflowStatus: boolean;
    @Input() status: String[];
    @Output() onQAUpdate: EventEmitter = new EventEmitter();
    @Input() disableQAWorksheet: boolean;
    @Input() qasign: boolean;

    ngOnInit(){

        this.initModel();
        if(!this.qaColumnLayout){
            this.qaColumnLayout = 2;
        }

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

    onQAChange(qaValue, qaId){
        this.qaData[qaId] = qaValue;
        console.log("drop down value for QA",qaValue);
        this.publishQAChange();
    }

    publishQAChange(){
        this.onQAUpdate.emit(new QAWorksheetData(this.qaId,this.qaData));
    }



}
