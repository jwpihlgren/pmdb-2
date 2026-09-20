import { TestBed } from '@angular/core/testing';

import { PopularShowsService } from './popular-shows.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('PopularShowsService', () => {
  let service: PopularShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(PopularShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
