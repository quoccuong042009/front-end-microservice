import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTalbeComponent } from './movie-talbe.component';

describe('MovieTalbeComponent', () => {
  let component: MovieTalbeComponent;
  let fixture: ComponentFixture<MovieTalbeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieTalbeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTalbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
