import { TestBed } from '@angular/core/testing';

import { DetailedShowService } from './detailed-show.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedShowService', () => {
  let service: DetailedShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(DetailedShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
