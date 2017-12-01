import { Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {AppState} from '../../../../app.service';
import { Observations } from '../../observations.component';

@Component({
  selector: 'save-reset',
  templateUrl: './worksheet.section.savereset.component.html',
  styleUrls: []
})

export class SaveResetSection {

  @Input() id: String;
  @Input() disableWorksheet: boolean;
  @Input() studyId : String;
  @Output() onUpdate: EventEmitter = new EventEmitter();

  constructor(
    private appState:AppState
  ) {}

  onSave(){
    this.onUpdate.emit({
      instruction: "SAVE"
    });
  }

  onReset(){
    this.onUpdate.emit({
      instruction: "RESET"
    });
  }
}
