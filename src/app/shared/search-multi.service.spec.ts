import { TestBed } from '@angular/core/testing';

import { SearchMultiService } from './search-multi.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('SearchMultiService', () => {
  let service: SearchMultiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(SearchMultiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
