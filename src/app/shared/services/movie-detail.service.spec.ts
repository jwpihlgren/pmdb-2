import { TestBed } from '@angular/core/testing';

import { DetailedMovieService } from './movie-detail.service';

describe('MovieDetailService', () => {
  let service: DetailedMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
