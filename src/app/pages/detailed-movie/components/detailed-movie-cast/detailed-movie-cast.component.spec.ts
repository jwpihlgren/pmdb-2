import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieCastComponent } from './detailed-movie-cast.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedMovieCastComponent', () => {
  let component: DetailedMovieCastComponent;
  let fixture: ComponentFixture<DetailedMovieCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedMovieCastComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedMovieCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
