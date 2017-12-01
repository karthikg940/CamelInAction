import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li class="details-tab" *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="javascript:void(0)" class="color-white"><i class="{{tab.icon}}"></i></a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

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
