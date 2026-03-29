import { TestBed } from '@angular/core/testing';

import { IsoCountryService } from './iso-country.service';

describe('OriginCountryService', () => {
    let service: IsoCountryService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IsoCountryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
