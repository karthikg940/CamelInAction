import { TestBed, async, inject} from '@angular/core/testing';
import {
    TestComponentBuilder,
    ComponentFixture
} from '@angular/core/testing';
import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';
import { DashboardService} from './dashboard.service';
import { DashboardComponent } from './dashboard.component';
import { GraphicalDetailComponent } from './graphical-detail/graphical-detail.component.ts';
import { GraphicalSummaryComponent } from  './graphical-summary/graphical-summary.component.ts';
import { BreadcrumComponent } from '../breadcrum';
import { NotificationComponent } from './notification/notification.component.ts'
import {AppState} from '../app.service';

import { EndPoint, ProxyEndPoint } from '../app.endpoints';
import * as moment from 'moment';

const getWidgetsRes = {
    "results":[
        {
            "id": "cst",
            "type": "My Studies",
            "total": 120,
            "status": ["New", "Pending", "Signed"],
            "value": [40,40,40]
        },
        {
            "id": "ats",
            "type": "Attestations",
            "total": 120,
            "status": ["New", "Pending", "Signed"],
            "value": [40,40,40]
        },
        {
            "id": "qar",
            "type": "QA Reviews",
            "total": 120,
            "status": ["New", "Pending", "Signed"],
            "value": [40,40,40]
        },
        {
            "id": "crd",
            "type": "Credentialing",
            "total": 120,
            "status": ["New", "Pending", "Completed"],
            "value": [40,40,40]
        }
    ]
};

const getWidgetDetailsRes = {
    "result":{
        "id": "MyTasks",
        "examtype":["Cardiac", "Thyroid", "Vascular", "Heart", "Carotid", "Venous", "Kidney", "Pancreas", "Liver", "Bladder", "Pelvic"],
        "series": [
            {
                "status":"New",
                "data": [15,24,15,17,23,12,11,24,23,39,27]
            },
            {
                "status": "Pending",
                "data": [10,15,23,17,12,16,21,6,24,9,16]
            },
            {
                "status": "Completed",
                "data": [4,17,19,9,45,16,23,26,16,8,13]
            }
        ]
    }
};

const getWidgetDetailsResProcessed = {
    "result":{
        "id": "MyTasks",
        "examtype":["Cardiac", "Thyroid", "Vascular", "Heart", "Carotid", "Venous", "Kidney", "Pancreas", "Liver", "Bladder", "Pelvic"],
        "series": [
            {
                "data": [15,24,15,17,23,12,11,24,23,39,27],
                "label":"New"
            },
            {
                "data": [10,15,23,17,12,16,21,6,24,9,16],
                "label": "Pending"
            },
            {
                "data": [4,17,19,9,45,16,23,26,16,8,13],
                "label": "Completed"
            }
        ]
    }
};

const defaultGraphicalSummaryData = {};
const defaultGraphicalDetailData = {
    result: {
        examtype:[],
        series:[{
            label:"",
            data: []
        }]
    }
};

class MockDashboardService {
    getWidgets(ids:String[], duration:Object){
        return Observable.of(getWidgetsRes);
    }
    getWidgetDetails(id:String, duration:Object){
        return Observable.of(JSON.parse(JSON.stringify(getWidgetDetailsRes)));
    }
}

class MockAppState {
    get(key:String){
        return ["mytasks","myattestations","qar","crd"];
    }
}

@Component({
    template: '',
    selector: 'breadcrum'
})
class MockBreadcrumComponent{}

@Component({
    template: '',
    selector: 'graphical-detail'
})
class MockGraphicalDetailComponent{}

@Component({
    template: '',
    selector: 'graphical-summary'
})
class MockGraphicalSummaryComponent{}

@Component({
    template: '',
    selector: 'notification'
})
class MockNotificationComponent{}


@NgModule({
    declarations: [BreadcrumComponent, GraphicalDetailComponent, GraphicalSummaryComponent, NotificationComponent],
    exports: [BreadcrumComponent, GraphicalDetailComponent, GraphicalSummaryComponent, NotificationComponent]
})
class MyModule {}

describe('Test Dashboard Component', () => {
    let fixture, dashboardComponent, dashboardService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MyModule],
            declarations: [ MockBreadcrumComponent, MockGraphicalDetailComponent, MockGraphicalSummaryComponent, MockNotificationComponent, DashboardComponent ],
            schemas: [NO_ERRORS_SCHEMA],
        }).overrideModule(MyModule, {
            remove: {
                declarations: [BreadcrumComponent, GraphicalDetailComponent, GraphicalSummaryComponent, NotificationComponent],
                exports: [BreadcrumComponent, GraphicalDetailComponent, GraphicalSummaryComponent, NotificationComponent]
            }
        }).overrideComponent(DashboardComponent, {
            set: {
                providers: [
                    {provide: DashboardService, useClass: MockDashboardService},
                    {provide: AppState, useClass: MockAppState},
                ]
            }
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DashboardComponent);
            dashboardComponent = fixture.componentInstance;
        });
    }));

    it('Should have default data on load ', () => {
        expect(JSON.stringify(dashboardComponent.graphicalSummaryData)).toEqual(JSON.stringify(defaultGraphicalSummaryData), "Summary Data Should have default");
        expect(JSON.stringify(dashboardComponent.graphicalDetailData)).toEqual(JSON.stringify(defaultGraphicalDetailData), "Detail Data should have default");
    });

    it('Should load data on duration change event ', () => {
        dashboardComponent.onDurationChange({start: moment().subtract(24, 'hours'), end: moment(), label: "Custom Range"});
        fixture.detectChanges();
        expect(JSON.stringify(dashboardComponent.graphicalSummaryData)).toEqual(JSON.stringify(getWidgetsRes), "Summary Data Should match");
        expect(JSON.stringify(dashboardComponent.graphicalDetailData)).toEqual(JSON.stringify(getWidgetDetailsResProcessed), "Detail Data should match" );
    });

    it('Should have as many summary widgets based on response ', () => {
        dashboardComponent.onDurationChange({start: moment().subtract(24, 'hours'), end: moment(), label: "Custom Range"});
        fixture.detectChanges();
        const el = fixture.debugElement
            .queryAll(By.directive(MockGraphicalSummaryComponent));
        expect(el.length).toEqual(getWidgetsRes.results.length);
    });

    it('Should have one detail widget', () => {
        dashboardComponent.onDurationChange({start: moment().subtract(24, 'hours'), end: moment(), label: "Custom Range"});
        fixture.detectChanges();
        const el = fixture.debugElement
            .queryAll(By.directive(MockGraphicalDetailComponent));
        expect(el.length).toEqual(1);
    });

    it('Should have one notification widget', () => {
        dashboardComponent.onDurationChange({start: moment().subtract(24, 'hours'), end: moment(), label: "Custom Range"});
        fixture.detectChanges();
        const el = fixture.debugElement
            .queryAll(By.directive(MockNotificationComponent));
        expect(el.length).toEqual(1);
    });

    it('Should have one breadcrum widget', () => {
        dashboardComponent.onDurationChange({start: moment().subtract(24, 'hours'), end: moment(), label: "Custom Range"});
        fixture.detectChanges();
        const el = fixture.debugElement
            .queryAll(By.directive(MockBreadcrumComponent));
        expect(el.length).toEqual(1);
    });

    it('Should load detail widget data on summary widget selection', () => {
        expect(JSON.stringify(dashboardComponent.graphicalDetailData)).toEqual(JSON.stringify(defaultGraphicalDetailData), "Detail Data should have default");
        dashboardComponent.onWidgetSelection({id: 'cst'});
        fixture.detectChanges();
        expect(JSON.stringify(dashboardComponent.graphicalDetailData)).toEqual(JSON.stringify(getWidgetDetailsResProcessed), "Detail Data should match" );
    });

});