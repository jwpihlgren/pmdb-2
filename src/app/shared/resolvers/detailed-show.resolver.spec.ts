import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailedShowResolver } from './detailed-show.resolver';

describe('detailedShowResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedShowResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
