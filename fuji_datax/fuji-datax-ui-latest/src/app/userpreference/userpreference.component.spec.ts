import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpreferenceComponent } from './userpreference.component';

describe('UserpreferenceComponent', () => {
  let component: UserpreferenceComponent;
  let fixture: ComponentFixture<UserpreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
