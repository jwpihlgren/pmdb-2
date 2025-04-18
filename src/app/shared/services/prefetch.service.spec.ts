import { TestBed } from '@angular/core/testing';

import { PrefetchService } from './prefetch.service';

describe('PrefetchService', () => {
  let service: PrefetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
