import { TestBed } from '@angular/core/testing';

import { TrendingMoviesService } from './trending-movies.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('TrendingMoviesService', () => {
  let service: TrendingMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(TrendingMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
