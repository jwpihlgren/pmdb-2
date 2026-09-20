import { TestBed } from '@angular/core/testing';

import { SearchTvService } from './search-tv.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('SearchTvService', () => {
  let service: SearchTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(SearchTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
