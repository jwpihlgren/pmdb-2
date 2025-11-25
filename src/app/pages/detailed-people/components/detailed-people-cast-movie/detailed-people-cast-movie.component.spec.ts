import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleCastMovieComponent } from './detailed-people-cast-movie.component';

describe('DetailedPeopleCastMovieComponent', () => {
  let component: DetailedPeopleCastMovieComponent;
  let fixture: ComponentFixture<DetailedPeopleCastMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleCastMovieComponent]
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
