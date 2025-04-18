import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieRecommendationsComponent } from './detailed-movie-recommendations.component';

describe('DetailedMovieRecommendationsComponent', () => {
  let component: DetailedMovieRecommendationsComponent;
  let fixture: ComponentFixture<DetailedMovieRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedMovieRecommendationsComponent]
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
