import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetconfigComponent } from './worksheetconfig.component';

describe('WorksheetconfigComponent', () => {
  let component: WorksheetconfigComponent;
  let fixture: ComponentFixture<WorksheetconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
