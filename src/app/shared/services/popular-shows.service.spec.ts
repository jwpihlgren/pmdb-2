import { TestBed } from '@angular/core/testing';

import { PopularShowsService } from './popular-shows.service';

describe('PopularShowsService', () => {
  let service: PopularShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
