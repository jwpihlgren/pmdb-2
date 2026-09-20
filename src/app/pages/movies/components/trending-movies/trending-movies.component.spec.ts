import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMoviesComponent } from './trending-movies.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('TrendingMoviesComponent', () => {
  let component: TrendingMoviesComponent;
  let fixture: ComponentFixture<TrendingMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingMoviesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
