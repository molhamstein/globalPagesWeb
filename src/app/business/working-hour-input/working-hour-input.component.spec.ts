import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHourInputComponent } from './working-hour-input.component';

describe('WorkingHourInputComponent', () => {
  let component: WorkingHourInputComponent;
  let fixture: ComponentFixture<WorkingHourInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHourInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHourInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
