import { TestBed } from '@angular/core/testing';

import { PopularMoviesService } from './popular-movies.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('PopularMoviesService', () => {
  let service: PopularMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(PopularMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
