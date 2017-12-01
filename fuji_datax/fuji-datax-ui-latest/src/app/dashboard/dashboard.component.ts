import { Component, ViewEncapsulation } from '@angular/core';
import {GraphicalDetailComponent} from './graphical-detail/graphical-detail.component';
import {GraphicalSummaryComponent} from './graphical-summary/graphical-summary.component';
import {NotificationComponent} from './notification/notification.component';
import {DashboardService} from './dashboard.service';
import {AppState} from '../app.service';
import { IGraphicalDetailData, IDuration } from '../app.model';

@Component({
selector: 'dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['dashboard.component.css'],encapsulation: ViewEncapsulation.None
})

export class DashboardComponent {

  private graphicalSummaryData: any = {
  };

  private graphicalDetailData: IGraphicalDetailData = {
    result: {
      examtype:[],
      series:[{
      label:"",
      data: []
      }]
    }
  };

  private selectedWidgetId:string;
  private selectedDuration:IDuration;

  constructor(private dashboardService: DashboardService, private appState: AppState){
  }

  loadAllWidgets(){
    this.loadSummaryWidgets();
    this.loadDetailWidget();
  }

  loadSummaryWidgets(){
    const widgetList: string[] = this.appState.get('preference.widgets');
    this.selectedWidgetId = widgetList ? widgetList[0] : null;
    this.dashboardService.getWidgets(widgetList, this.selectedDuration).subscribe(
    widgetsData => {
      this.graphicalSummaryData = widgetsData;
      console.log('loadSummaryWidgets res:',widgetsData);
    },
    error =>  console.error(error));
  }

  loadDetailWidget(){
    this.dashboardService.getWidgetDetails(this.selectedWidgetId, this.selectedDuration).subscribe(
    widgetsDetailData => {
      console.log("widgetsDetailDatawidgetsDetailData",widgetsDetailData);
      for (var len = 0; len< widgetsDetailData.result.series.length; len++){
        widgetsDetailData.result.series[len].label =  widgetsDetailData.result.series[len].status;
        delete widgetsDetailData.result.series[len].status;
      }
      this.graphicalDetailData = widgetsDetailData;
      console.log('loadDetailWidget res:',widgetsDetailData);
    },
    error =>  console.error(error));
  }

  onDurationChange(event){
    console.log("onDurationChange", event);
    this.selectedDuration = event;
    this.loadAllWidgets();
  }

  onWidgetSelection(event){
    console.log('onWidgetSelection', event);
    this.selectedWidgetId = event.id;
    this.loadDetailWidget();
  }

}
