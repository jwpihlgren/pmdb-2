import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailedPeopleResolver } from './detailed-people.resolver';

describe('detailedPeopleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedPeopleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
