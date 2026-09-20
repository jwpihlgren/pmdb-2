import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleOverviewComponent } from './detailed-people-overview.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedPeopleOverviewComponent', () => {
  let component: DetailedPeopleOverviewComponent;
  let fixture: ComponentFixture<DetailedPeopleOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleOverviewComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
