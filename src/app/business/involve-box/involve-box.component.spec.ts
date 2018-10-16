import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvolveBoxComponent } from './involve-box.component';

describe('InvolveBoxComponent', () => {
  let component: InvolveBoxComponent;
  let fixture: ComponentFixture<InvolveBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvolveBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvolveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
