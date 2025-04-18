import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieCastComponent } from './detailed-movie-cast.component';

describe('DetailedMovieCastComponent', () => {
  let component: DetailedMovieCastComponent;
  let fixture: ComponentFixture<DetailedMovieCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedMovieCastComponent]
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
