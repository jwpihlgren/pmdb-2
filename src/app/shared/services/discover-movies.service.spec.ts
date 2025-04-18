import { TestBed } from '@angular/core/testing';

import { DiscoverMoviesService } from './discover-movies.service';

describe('DiscoverMoviesService', () => {
  let service: DiscoverMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
