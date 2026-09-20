import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedShowRecommendationsComponent } from './detailed-show-recommendations.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedShowRecommendationsComponent', () => {
  let component: DetailedShowRecommendationsComponent;
  let fixture: ComponentFixture<DetailedShowRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedShowRecommendationsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedShowRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
