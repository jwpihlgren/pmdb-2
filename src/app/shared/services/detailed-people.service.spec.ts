import { TestBed } from '@angular/core/testing';

import { DetailedPeopleService } from './detailed-people.service';

describe('DetailedPeopleService', () => {
  let service: DetailedPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
