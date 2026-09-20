import { TestBed } from '@angular/core/testing';

import { SearchPeopleService } from './search-people.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('SearchPeopleService', () => {
  let service: SearchPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(SearchPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
