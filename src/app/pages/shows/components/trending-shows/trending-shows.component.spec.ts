import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingShowsComponent } from './trending-shows.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('TrendingShowsComponent', () => {
  let component: TrendingShowsComponent;
  let fixture: ComponentFixture<TrendingShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingShowsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
