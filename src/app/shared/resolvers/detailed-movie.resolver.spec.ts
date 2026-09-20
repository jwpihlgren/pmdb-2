import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { DetailedMovie } from '../models/interfaces/detailed-movie';

import { detailedMovieResolver } from './detailed-movie.resolver';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('detailedMovieResolver', () => {
  const executeResolver: ResolveFn<DetailedMovie> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedMovieResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
