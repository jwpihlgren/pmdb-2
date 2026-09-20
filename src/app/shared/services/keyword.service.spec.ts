import { TestBed } from '@angular/core/testing';

import { KeywordService } from './keyword.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('KeywordService', () => {
  let service: KeywordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(KeywordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
