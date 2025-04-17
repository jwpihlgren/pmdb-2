import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleRecommendationsComponent } from './detailed-people-recommendations.component';

describe('DetailedPeopleRecommendationsComponent', () => {
  let component: DetailedPeopleRecommendationsComponent;
  let fixture: ComponentFixture<DetailedPeopleRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
