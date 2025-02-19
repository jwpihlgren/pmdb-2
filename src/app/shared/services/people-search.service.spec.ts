import { TestBed } from '@angular/core/testing';

import { PeopleSearchService } from './people-search.service';

describe('PeopleSearchService', () => {
  let service: PeopleSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
