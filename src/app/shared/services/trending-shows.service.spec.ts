import { TestBed } from '@angular/core/testing';

import { TrendingShowsService } from './trending-shows.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('TrendingShowsService', () => {
  let service: TrendingShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(TrendingShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
