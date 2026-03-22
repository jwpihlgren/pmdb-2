import { TestBed } from '@angular/core/testing';

import { DiscoverStateService } from './discover-state.service';

describe('DiscoverStateService', () => {
  let service: DiscoverStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
