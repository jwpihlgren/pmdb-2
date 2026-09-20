import { TestBed } from '@angular/core/testing';

import { DiscoverShowService } from './discover-show.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DiscoverShowService', () => {
  let service: DiscoverShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(DiscoverShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
