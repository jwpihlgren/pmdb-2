import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscoverMoviesComponent } from './discover-movies.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';


describe('DiscoverMoviesComponent', () => {
  let component: DiscoverMoviesComponent;
  let fixture: ComponentFixture<DiscoverMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverMoviesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
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
