import { TestBed, ComponentFixture, async, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { GraphicalSummaryComponent } from './graphical-summary.component';
import { RouterLinkStubDirective } from '../../../testing/router-stubs'
import * as moment from 'moment';


describe('Test GraphicalSummaryComponent', () => {
    let fixture, component, titleEl, totalCountEl, durationEl, linkDes, links, canvasEl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GraphicalSummaryComponent, RouterLinkStubDirective],
            imports:[ChartsModule]
       });

        fixture = TestBed.createComponent(GraphicalSummaryComponent);
        component = fixture.componentInstance;
        component.data = {
            "id": "cst",
            "type": "My Studies",
            "total": 120,
            "status": ["New", "Pending", "Signed"],
            "value": [40,40,40]
        };
        component.selectedDuration = {start: moment().subtract(24, 'hours'), end: moment(), label: "Past 24Hrs"};
        component.ngOnChanges();
        fixture.detectChanges();

        titleEl = fixture.debugElement.query(By.css('.panel-heading div div span'));
        durationEl = fixture.debugElement.query(By.css('.panel-body h4'));
        totalCountEl = fixture.debugElement.query(By.css('.panel-body h1'));

        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkStubDirective));

        canvasEl = fixture.debugElement
            .query(By.css('canvas'));

        // get the attached link directive instances using the DebugElement injectors
        links = linkDes
            .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    });

    it('should have valid color mapping for all status', () => {
        expect(component.colors[0].backgroundColor.length).toEqual(component.data.status.length);
        var hasNull = component.colors[0].backgroundColor.some(function (el) {
            return el == null;
        });
        expect(hasNull).toEqual(false);
    });

    it('should display title in Caps', () => {
        expect(titleEl.nativeElement.textContent).toEqual(component.data.type.toUpperCase());
    });

    it('should display duration label', () => {
        expect(durationEl.nativeElement.textContent).toEqual(component.selectedDuration.label);
    });

    it('should display duration period for custom range', () => {
        component.selectedDuration = {start: moment().subtract(24, 'hours'), end: moment(), label: "Custom Range"};
        fixture.detectChanges();
        durationEl = fixture.debugElement.query(By.css('.panel-body h4'));
        const durationStr = moment().subtract(24, 'hours').format('MMM DD,YYYY')+' to '+ moment().format('MMM DD,YYYY');
        expect(durationEl.nativeElement.textContent).toEqual(durationStr);
    });

    it('should display total', () => {
        expect(parseInt(totalCountEl.nativeElement.textContent)).toEqual(component.data.total);
    });

    it('should publish widgetSelected event', () => {
        let exec = false;
        component.widgetSelected.subscribe((event)=> {
            expect(event.id).toEqual(component.data.id, 'event id should be matching with widget id');
            exec = true;
        });
        component.chartClicked();
        expect(exec).toEqual(true, 'event not published');
    });

    it('should have valid route links and query params', () => {
        expect(links.length).toBe(1, 'should have only 1 link');
        expect(links[0].linkParams).toBe('/studylist', 'should go to StudyList');
        expect(links[0].queryParams.id).toEqual('cst', 'id should be matching');
        expect(links[0].queryParams.start).toEqual(component.selectedDuration.start, 'start duration should be matching');
        expect(links[0].queryParams.end).toEqual(component.selectedDuration.end, 'end duration should be matching');
    });

    it('should call resize widget on input change', () => {
        fixture.detectChanges();
        const spy = spyOn(component, 'ngOnChanges');
        component.ngOnChanges();
        fixture.detectChanges();
        expect(spy.calls.any()).toBe(true);
    });


});