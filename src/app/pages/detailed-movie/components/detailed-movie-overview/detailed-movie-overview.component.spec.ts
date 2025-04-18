import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieOverviewComponent } from './detailed-movie-overview.component';

describe('DetailedMovieOverviewComponent', () => {
  let component: DetailedMovieOverviewComponent;
  let fixture: ComponentFixture<DetailedMovieOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedMovieOverviewComponent]
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
