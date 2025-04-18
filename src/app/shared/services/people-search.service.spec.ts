import { TestBed } from '@angular/core/testing';

import { SearchPeopleService } from './people-search.service';

describe('PeopleSearchService', () => {
  let service: SearchPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
