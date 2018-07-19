import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeTableComponent } from './showtime-table.component';

describe('ShowtimeTableComponent', () => {
  let component: ShowtimeTableComponent;
  let fixture: ComponentFixture<ShowtimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
