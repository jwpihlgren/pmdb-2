import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedShowRecommendationsComponent } from './detailed-show-recommendations.component';

describe('DetailedShowRecommendationsComponent', () => {
  let component: DetailedShowRecommendationsComponent;
  let fixture: ComponentFixture<DetailedShowRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedShowRecommendationsComponent]
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
