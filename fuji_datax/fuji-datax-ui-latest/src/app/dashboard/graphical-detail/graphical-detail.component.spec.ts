import { TestBed, ComponentFixture, async, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { GraphicalDetailComponent } from './graphical-detail.component';


describe('Test GraphicalDetailComponent', function () {
    var fixture, component, canvasEl, titleEl;
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [GraphicalDetailComponent],
            imports: [ChartsModule]
        });
        fixture = TestBed.createComponent(GraphicalDetailComponent);
        component = fixture.componentInstance;
        component.labels = ["Cardiac", "Thyroid"];
        component.datasets = [
            {
                "status": "New",
                "data": [15, 24, 15, 17, 23, 12, 11, 24, 23, 39, 27]
            },
            {
                "status": "Pending",
                "data": [10, 15, 23, 17, 12, 16, 21, 6, 24, 9, 16]
            }
        ];
        component.ngOnChanges();
        fixture.detectChanges();
        titleEl = fixture.debugElement.query(By.css('.panel-heading div div span'));
    });
    it('should display title ', function () {
        expect(titleEl.nativeElement.textContent).toEqual("Exam Studies Overview");
    });
});