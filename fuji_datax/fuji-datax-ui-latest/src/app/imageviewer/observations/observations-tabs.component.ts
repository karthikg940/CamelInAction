import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ObservationsTabComponent } from './observations-tab.component';

@Component({
  selector: 'observations-tabs',
  template:`
    <ul class="m-t-10 nav nav-tabs">
      <li class="observations-details-tab" *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="javascript:void(0)">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class ObservationsTabsComponent implements AfterContentInit {

  @ContentChildren(ObservationsTabComponent) tabs: QueryList<ObservationsTabComponent>;

  ngAfterContentInit() {
  //get active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    //Default visible tab
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: Tab){
  //deactivate tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
 //when user clicks the tab is visbile
    tab.active = true;
  }
}
