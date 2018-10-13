import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVComponent } from './card-v.component';

describe('CardVComponent', () => {
  let component: CardVComponent;
  let fixture: ComponentFixture<CardVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
