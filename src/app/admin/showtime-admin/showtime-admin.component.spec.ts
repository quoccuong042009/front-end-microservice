import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeAdminComponent } from './showtime-admin.component';

describe('ShowtimeAdminComponent', () => {
  let component: ShowtimeAdminComponent;
  let fixture: ComponentFixture<ShowtimeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtimeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
