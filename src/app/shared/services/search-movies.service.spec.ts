import { TestBed } from '@angular/core/testing';

import { SearchMoviesService } from './search-movies.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('SearchMoviesService', () => {
  let service: SearchMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(SearchMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
