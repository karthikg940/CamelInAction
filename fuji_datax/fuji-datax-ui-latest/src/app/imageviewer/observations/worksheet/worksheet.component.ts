import { Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Observations } from '../observations.component';
import { WorksheetData } from './worksheet.model';
import { QAWorksheetData } from './worksheet.model';

@Component({
  selector: 'worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: []
})

export class Worksheet {

  @Input() template: Object;
  @Input() id: String;
  @Input() data: Object;
  @Input() sdata: Object;
  @Input() studyId : String;
  @Input() examType: String[];
  @Input() selectedExamTypeId: String;
  @Input() disableQaSign:boolean;
  @Input() qasign:boolean;
  @Input() tagList:Object[];
  @Input() activeTagList:Object[];
  @Input() loginUserId: String;
  @Input() qaUser: String;
  @Input() assignedUser: String;
  @Input() attendingUser: String;
  @Input() submitOnSignFlag: boolean;
  @Input() workflowStatus: boolean;
  @Input() attendingWorkflowStatus: boolean;
  @Input() status: String[];
  @Input() disableQAWorksheet:boolean;
  @Output() onUpdate: EventEmitter = new EventEmitter();

  ngOnInit(){
    this.initModel();
  }

  initModel(){
    if(!this.data){
      this.data = {};
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Worksheet ngOnChanges", changes, this.data);
    if(changes['data'])
    {
      this.initModel();
    }
  }

  public onChildChange(event){
    console.log('onChildChange',event);
    if(event.instruction){
      // for save, cancel, reset
      this.onUpdate.emit(event);
    } else {
      // for data updates
      this.data[event.id] = event.data;
      this.publishChange();
    }
  }

  publishChange(){
    this.onUpdate.emit(new WorksheetData(this.id,this.data));
  }
}
