import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {AppState} from '../../../../app.service';
import { Observations } from '../../observations.component';
import { WorksheetSectionData } from './worksheet.section.examapproval.model';



@Component({
    selector: 'exam-approval',
    templateUrl: './worksheet.section.examapproval.component.html',
    styleUrls: []
})
export class ExamApprovalSection {


   @Input() sdata: Object = {};
   @Input() id: String;
   @Input() disableWorksheet: boolean;
   @Input() disableExamApproval: boolean;
   @Input() studyId : String;
   @Input() examType: String[];
   @Input() selectedExamTypeId: String;
   @Output() onUpdate: EventEmitter = new EventEmitter();
   private sign: Object;
   @Input() status: String[];
    constructor(
    		private appState:AppState

    		) {

    }

    ngOnInit(){
    	console.log("----------",this.status[0]);
        this.initModel();
    }

    initModel(){
        if(!this.sdata){
            this.sdata = {};
        }
        if(!this.sdata['poc']){
            this.sdata['poc'] = {};
        }
        this.sdata['poc'].signed = this.sdata['poc'].sign ? true: false;
        if(!this.sdata['attending']){
            this.sdata['attending'] = {};
        }
        this.sdata['attending'].signed = this.sdata['attending'].sign ? true: false;
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('ExamApprovalSection ngOnChanges',changes);
        if(changes['sdata']){
            this.initModel();
        }
    }

    onChange(type,value){
        this.sdata[type].signed = value;
        console.log("value",value);
        if(value){
            this.sdata[type].sign = this.appState.get("userName");
            this.sdata[type].timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
            this.publishSign(type);
        }else{
            delete this.sdata[type].sign;
            delete this.sdata[type].timestamp;
            this.publishUnsign(type);
        }
    }

  publishSign(type){
        this.onUpdate.emit( new WorksheetSectionData('SIGN', type, this.sdata[type].sign, this.sdata[type].timestamp));
    }

    publishUnsign(type){
        this.onUpdate.emit({
        	instruction: 'UNSIGN',
            type: type
        });
    }

    onSave(){
        this.onUpdate.emit({
           instruction: "SAVE",
           wrkshttype:"Procedural"
        });
    }

    onCancel(){
        this.onUpdate.emit({
            instruction: "CANCEL"
        });
    }

   onReset(){
        this.onUpdate.emit({
            instruction: "RESET"
        });
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
