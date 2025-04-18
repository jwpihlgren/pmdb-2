import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailedMovieResolver } from './detailed-movie.resolver';

describe('detailedMovieResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedMovieResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
