import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSeasonComponent } from './detailed-season.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedSeasonComponent', () => {
  let component: DetailedSeasonComponent;
  let fixture: ComponentFixture<DetailedSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedSeasonComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
