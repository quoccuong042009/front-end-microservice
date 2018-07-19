import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPannelComponent } from './order-pannel.component';

describe('OrderPannelComponent', () => {
  let component: OrderPannelComponent;
  let fixture: ComponentFixture<OrderPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
