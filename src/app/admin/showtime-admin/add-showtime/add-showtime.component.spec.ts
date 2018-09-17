import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowtimeComponent } from './add-showtime.component';

describe('AddShowtimeComponent', () => {
  let component: AddShowtimeComponent;
  let fixture: ComponentFixture<AddShowtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShowtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShowtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
