import { TestBed } from '@angular/core/testing';

import { IsoCountryService } from './iso-country.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('OriginCountryService', () => {
    let service: IsoCountryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
        service = TestBed.inject(IsoCountryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
