import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'option-text-number',
    templateUrl: './worksheet.option.textnumber.component.html',
    styleUrls: []
})
export class OptionTextNumber {

    @Input() id: String;
    @Input() data: Object;
    @Input() label: String;
    @Output() onUpdate: EventEmitter = new EventEmitter();
    @Input() qasign:boolean;
    public onChange(value){
        this.data = value;
        this.publishChange();
    }

    publishChange(){
        this.onUpdate.emit({
            id: 'value',
            data: this.data
        });
    }

}
