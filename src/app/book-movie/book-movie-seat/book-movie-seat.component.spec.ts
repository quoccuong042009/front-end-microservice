import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMovieSeatComponent } from './book-movie-seat.component';

describe('BookMovieSeatComponent', () => {
  let component: BookMovieSeatComponent;
  let fixture: ComponentFixture<BookMovieSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMovieSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMovieSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
