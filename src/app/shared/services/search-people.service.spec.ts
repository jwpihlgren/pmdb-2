import { TestBed } from '@angular/core/testing';


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
