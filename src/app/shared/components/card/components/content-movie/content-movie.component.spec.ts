import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMovieComponent } from './content-movie.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ContentMovieComponent', () => {
  let component: ContentMovieComponent;
  let fixture: ComponentFixture<ContentMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentMovieComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
