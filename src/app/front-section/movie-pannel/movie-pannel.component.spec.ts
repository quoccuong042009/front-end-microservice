import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePannelComponent } from './movie-pannel.component';

describe('MoviePannelComponent', () => {
  let component: MoviePannelComponent;
  let fixture: ComponentFixture<MoviePannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
