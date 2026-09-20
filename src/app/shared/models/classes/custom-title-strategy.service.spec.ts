import { TestBed } from '@angular/core/testing';

import { CustomTitleStrategyService } from './custom-title-strategy.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('CustomTitleStrategyService', () => {
  let service: CustomTitleStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(CustomTitleStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
