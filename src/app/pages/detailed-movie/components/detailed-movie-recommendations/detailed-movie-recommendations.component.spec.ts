import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieRecommendationsComponent } from './detailed-movie-recommendations.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedMovieRecommendationsComponent', () => {
  let component: DetailedMovieRecommendationsComponent;
  let fixture: ComponentFixture<DetailedMovieRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedMovieRecommendationsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedMovieRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
