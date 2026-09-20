import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHeroComponent } from './content-hero.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ContentHeroComponent', () => {
  let component: ContentHeroComponent;
  let fixture: ComponentFixture<ContentHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentHeroComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
