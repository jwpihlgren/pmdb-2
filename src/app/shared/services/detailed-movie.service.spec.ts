import { TestBed } from '@angular/core/testing';
import { DetailedMovieService } from './detailed-movie.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';


describe('MovieDetailService', () => {
  let service: DetailedMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(DetailedMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
