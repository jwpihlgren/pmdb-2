import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverMoviesComponent } from './search-movies.component';

describe('DiscoverMoviesComponent', () => {
  let component: DiscoverMoviesComponent;
  let fixture: ComponentFixture<DiscoverMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
