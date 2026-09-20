import { TestBed } from '@angular/core/testing';

import { PrefetchService } from './prefetch.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('PrefetchService', () => {
  let service: PrefetchService<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject<PrefetchService<number>>(PrefetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
