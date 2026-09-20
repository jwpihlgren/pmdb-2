import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedShowComponent } from './detailed-show.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedShowComponent', () => {
  let component: DetailedShowComponent;
  let fixture: ComponentFixture<DetailedShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedShowComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
