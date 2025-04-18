import { TestBed } from '@angular/core/testing';

import { DiscoverTvService } from './discover-tv.service';

describe('DiscoverTvService', () => {
  let service: DiscoverTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
