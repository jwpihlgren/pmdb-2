import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedShowOverviewComponent } from './detailed-show-overview.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedShowOverviewComponent', () => {
  let component: DetailedShowOverviewComponent;
  let fixture: ComponentFixture<DetailedShowOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedShowOverviewComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedShowOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
