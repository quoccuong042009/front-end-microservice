import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowtimeTableComponent } from './add-showtime-table.component';

describe('AddShowtimeTableComponent', () => {
  let component: AddShowtimeTableComponent;
  let fixture: ComponentFixture<AddShowtimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShowtimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShowtimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
