import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGuardComponent } from './order-guard.component';

describe('OrderGuardComponent', () => {
  let component: OrderGuardComponent;
  let fixture: ComponentFixture<OrderGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
