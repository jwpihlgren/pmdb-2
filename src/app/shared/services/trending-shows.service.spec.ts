import { TestBed } from '@angular/core/testing';

import { TrendingShowsService } from './trending-shows.service';

describe('TrendingShowsService', () => {
  let service: TrendingShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
