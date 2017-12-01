import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
@Component({
    selector: 'option-multi-select',
    templateUrl: './worksheet.option.multiselect.component.html',
    styleUrls: []
})
export class OptionMultiSelect {

    @Input() id: String;
    @Input() data: Object;
    @Input() options: Object[] = [];
    @Input() columnLayout: number;
    @Output() onUpdate: EventEmitter = new EventEmitter();
    @Input() qasign:boolean;
    ngOnInit(){
        this.initModel();
        if(!this.columnLayout){
            this.columnLayout = 2;
        }
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

    public onChange(value, id){
        this.data[id] = value;
        this.publishChange();
    }

    publishChange(){
        this.onUpdate.emit({
            id: "value",
            data: this.data
        });
    }

    public onChildChange(event){
        this.data[event.id] = event.data;
        this.publishChange();
    }

}
