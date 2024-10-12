import { TestBed } from '@angular/core/testing';

import { MovieDetailResolverService } from './movie-detail-resolver.service';

describe('MovieDetailResolverService', () => {
  let service: MovieDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
