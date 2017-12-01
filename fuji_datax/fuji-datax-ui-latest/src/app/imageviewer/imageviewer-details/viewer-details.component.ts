import {Component, NgModule, Input} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TabsComponent} from './tabs.component';
import {TabComponent} from './tab.component';
import {PatientDetailsComponent} from './patient-details.component';
import {StudyDetailsComponent} from './study-details.component';
import {ImageviewerComponent} from 'imageviewer/imageviewer.component';

@Component({
  selector: 'imageviewer-details',
  templateUrl: './viewer-details.component.html'
})
export class ViewerDetailsComponent {
	@Input() patientDetails:Object;
}
