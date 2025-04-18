import { TestBed } from '@angular/core/testing';

import { SearchMultiService } from './search-multi.service';

describe('SearchMultiService', () => {
  let service: SearchMultiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMultiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
