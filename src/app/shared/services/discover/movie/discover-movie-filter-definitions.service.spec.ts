import { TestBed } from '@angular/core/testing';
import { DiscoverMovieFilterDefinitions } from './discover-movie-filter-definitions.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';


describe('TmdbDiscoverMovieFilterConfigService', () => {
    let service: DiscoverMovieFilterDefinitions;

    beforeEach(() => {
        TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
        service = TestBed.inject(DiscoverMovieFilterDefinitions);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
