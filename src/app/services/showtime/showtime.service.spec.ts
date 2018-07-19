import { TestBed, inject } from '@angular/core/testing';

import { ShowtimeService } from './showtime.service';

describe('ShowtimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowtimeService]
    });
  });

  it('should be created', inject([ShowtimeService], (service: ShowtimeService) => {
    expect(service).toBeTruthy();
  }));
});
