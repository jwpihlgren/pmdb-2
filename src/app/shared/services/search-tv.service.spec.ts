import { TestBed } from '@angular/core/testing';

import { SearchTvService } from './search-tv.service';

describe('SearchTvService', () => {
  let service: SearchTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
