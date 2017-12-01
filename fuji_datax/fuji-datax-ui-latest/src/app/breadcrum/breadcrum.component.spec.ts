import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { BreadcrumComponent } from '../breadcrum';
import * as moment from 'moment';


describe('Test BreadcrumComponent', () => {
    let fixture, component, primaryTitleEl, secondaryTitleEl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumComponent]
        });

        fixture = TestBed.createComponent(BreadcrumComponent);
        component = fixture.componentInstance;
        primaryTitleEl = fixture.debugElement.query(By.css('h2.m-y-10'));
        secondaryTitleEl = fixture.debugElement.query(By.css('a.color-white'));
    });

    it('should have blank default title', () => {
        expect(primaryTitleEl.nativeElement.textContent).toEqual('');
    });

    it('should have blank default secondary title', () => {
        expect(secondaryTitleEl.nativeElement.textContent).toEqual('');
    });

    it('should display title', () => {
        const title = "Dashboard";
        component.title = title;
        fixture.detectChanges();
        expect(primaryTitleEl.nativeElement.textContent).toEqual(title);
    });

    it('should display secondary title', () => {
        const title = "Dashboard2";
        component.secondtitle = title;
        fixture.detectChanges();
        expect(secondaryTitleEl.nativeElement.textContent).toEqual(title);
    });

    it('should publish past24hrs duration event on load when no defaultDuration is set ', () => {
        component.durationChange.subscribe((durationEvent)=> {
            console.log('durationEvent',durationEvent);
            expect(durationEvent.label).toEqual("Past 24Hrs");
        });
        component.ngAfterViewInit();
    });

    it('should publish defaultDuration event on load when defaultDuration is set', () => {
        const defaultDuration = {
            label: 'One Week', start: moment().subtract(6, 'days'), end:moment()
        };
        component.durationChange.subscribe((durationEvent)=> {
            expect(durationEvent.label).toEqual(defaultDuration.label);
            expect(durationEvent.start).toEqual(defaultDuration.start);
            expect(durationEvent.end).toEqual(defaultDuration.end);
        });
        component.defaultDuration = defaultDuration;
        component.ngAfterViewInit();
    });

});
