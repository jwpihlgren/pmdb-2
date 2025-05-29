import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailedSeasonResolver } from './detailed-season.resolver';

describe('detailedSeasonResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedSeasonResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
