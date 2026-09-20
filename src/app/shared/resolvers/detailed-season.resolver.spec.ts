import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { DetailedSeason } from '../models/interfaces/detailed-season';

import { detailedSeasonResolver } from './detailed-season.resolver';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('detailedSeasonResolver', () => {
  const executeResolver: ResolveFn<DetailedSeason> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailedSeasonResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
