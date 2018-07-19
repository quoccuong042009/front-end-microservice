import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSectionComponent } from './front-section.component';

describe('FrontSectionComponent', () => {
  let component: FrontSectionComponent;
  let fixture: ComponentFixture<FrontSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
