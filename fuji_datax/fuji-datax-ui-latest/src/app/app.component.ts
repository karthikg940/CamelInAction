/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation,Inject,Input} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
/*import { LeftNavComponent } from './leftnav/leftnav.component';*/

declare var $ : JQueryStatic;

import { AppState } from './app.service';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
       '../../node_modules/font-awesome/css/font-awesome.min.css',
      '../../node_modules/bootstrap-daterangepicker/daterangepicker.css',
      '../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css',
      '../../node_modules/bootstrap/dist/css/bootstrap.css',
      './app.component.css'
  ],
    templateUrl:'./app.component.html'
 
})
export class AppComponent {

    private  userName:Object = {};

	private workflowPreference:Object = {};


    constructor(public appState:AppState, translate:TranslateService) {

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');

    }

    ngOnInit() {
    	 console.log('Initial App State', this.appState.state);
         this.loadUsername();
         this.loadPreference();
    }

    loadUsername() {
        this.appState.getUserName().subscribe(
                userNameData => {
                this.userName = userNameData;
                console.log('UserName res:', userNameData);
            },
                error =>  console.error(error));
    }
    
    loadPreference()
    {
    	this.appState.getPreference().subscribe(
    			preference => {
    				this.workflowPreference = preference;
    				console.log('Preference res',preference)
    			},
                error =>  console.error(error));
    }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
