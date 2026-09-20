import { TestBed } from '@angular/core/testing';

import { DetailedPeopleService } from './detailed-people.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedPeopleService', () => {
  let service: DetailedPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(DetailedPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
