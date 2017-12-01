import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { WorksheetData } from '../../../worksheet.model';
import { QAWorksheetData } from '../../../worksheet.model';
@Component({
    selector: 'option-dropdown-accordion',
    templateUrl: './worksheet.option.dropdown-accordion.component.html',
    styleUrls: []
})
export class OptionDropDownAccordion {

@Input() qaId: String;
@Input() qaData: Object;
@Input() id: String;
@Input() qaOptions: Object[] = [];
@Input() qaColumnLayout: number;
@Input() workflowStatus: boolean;
@Input() status: String[];
@Input() disableQAWorksheet: boolean;
@Output() onQAUpdate: EventEmitter = new EventEmitter();

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
    console.log("qqqqqqqqqqq",this.qaData[qaId]);
    this.publishQAChange();
}

publishQAChange(){
	console.log("inside publish method");
    this.onQAUpdate.emit(new QAWorksheetData(this.qaId,this.qaData));
}

}
