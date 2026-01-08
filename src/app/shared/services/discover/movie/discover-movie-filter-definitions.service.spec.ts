import { TestBed } from '@angular/core/testing';
import { DiscoverMovieFilterDefinitions } from './discover-movie-filter-definitions.service';


describe('TmdbDiscoverMovieFilterConfigService', () => {
    let service: DiscoverMovieFilterDefinitions;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DiscoverMovieFilterDefinitions);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
