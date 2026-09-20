import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import DetailedPeople from '../models/interfaces/detailed-people';

import { detailedPeopleResolver } from './detailed-people.resolver';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('detailedPeopleResolver', () => {
  const executeResolver: ResolveFn<DetailedPeople> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedPeopleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
