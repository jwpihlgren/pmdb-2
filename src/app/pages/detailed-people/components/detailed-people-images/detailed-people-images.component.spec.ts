import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleImagesComponent } from './detailed-people-images.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DetailedPeopleImagesComponent', () => {
  let component: DetailedPeopleImagesComponent;
  let fixture: ComponentFixture<DetailedPeopleImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleImagesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
