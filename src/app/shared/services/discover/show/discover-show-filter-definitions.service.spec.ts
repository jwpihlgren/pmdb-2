import { TestBed } from '@angular/core/testing';

import { DiscoverShowFilterDefinitionsService } from './discover-show-filter-definitions.service';

describe('DiscoverShowFilterDefinitionsService', () => {
  let service: DiscoverShowFilterDefinitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverShowFilterDefinitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
