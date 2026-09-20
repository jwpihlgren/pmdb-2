import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieOverviewComponent } from './detailed-movie-overview.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedMovieOverviewComponent', () => {
  let component: DetailedMovieOverviewComponent;
  let fixture: ComponentFixture<DetailedMovieOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedMovieOverviewComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedMovieOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
