import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleCastShowComponent } from './detailed-people-cast-show.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedPeopleCastShowComponent', () => {
  let component: DetailedPeopleCastShowComponent;
  let fixture: ComponentFixture<DetailedPeopleCastShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleCastShowComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleCastShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
