import { Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { WorksheetData } from '../worksheet.model';
@Component({
    selector: 'exam-overview',
    templateUrl: './worksheet.section.examoverview.component.html',
    styleUrls: []
})
export class ExamOverviewSection {

    @Input() data: Object = {};
    @Input() id: String;
    @Output() onUpdate: EventEmitter = new EventEmitter();
    private types = ['Diagnostic', 'Educational', 'Procedural'];
    private changedType:String;
    private categories = ['Resuscitative', 'Symptom based', 'Procedural', 'Unknown/ other'];
    private changedCategory:String;
    private exam = ['Initial exam','Repeat exam'];
    private changedExam:String;
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
        console.log("ExamOverviewSection ngOnChanges", changes);
        if(changes['data'])
            this.initModel();
    }

    onChange(value, id){
        this.data[id] = value;
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
