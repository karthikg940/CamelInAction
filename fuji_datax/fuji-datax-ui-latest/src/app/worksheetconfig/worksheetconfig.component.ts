import { Component, OnInit, EventEmitter, Output, ViewChild,  } from '@angular/core';
import {bootstrap, Component} from 'angular2/angular2';


@Component({
  selector: 'app-worksheetconfig',
  templateUrl: './worksheetconfig.component.html',
  styleUrls: ['./worksheetconfig.component.css']
})
export class WorksheetconfigComponent implements OnInit {
    public wsConfig: IPasswordConfig ={} ;
  constructor() { }

  ngOnInit() {
			
  }
	savePolicy(value:wsConfig,isValid: boolean){
	 
     console.log("submit");
  }
}
