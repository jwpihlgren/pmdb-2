import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleCastMovieComponent } from './detailed-people-cast-movie.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedPeopleCastMovieComponent', () => {
  let component: DetailedPeopleCastMovieComponent;
  let fixture: ComponentFixture<DetailedPeopleCastMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleCastMovieComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleCastMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
