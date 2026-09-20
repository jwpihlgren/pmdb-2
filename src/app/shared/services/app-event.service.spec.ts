import { TestBed } from '@angular/core/testing';

import { AppEventService } from './app-event.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('AppEventService', () => {
  let service: AppEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(AppEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
