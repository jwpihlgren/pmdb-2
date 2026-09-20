import { TestBed } from '@angular/core/testing';

import { DiscoverShowFilterDefinitionsService } from './discover-show-filter-definitions.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DiscoverShowFilterDefinitionsService', () => {
  let service: DiscoverShowFilterDefinitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(DiscoverShowFilterDefinitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
