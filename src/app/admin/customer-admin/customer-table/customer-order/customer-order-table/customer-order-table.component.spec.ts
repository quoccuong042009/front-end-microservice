import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderTableComponent } from './customer-order-table.component';

describe('CustomerOrderTableComponent', () => {
  let component: CustomerOrderTableComponent;
  let fixture: ComponentFixture<CustomerOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
