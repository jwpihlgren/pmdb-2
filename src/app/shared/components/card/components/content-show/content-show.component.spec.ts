import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentShowComponent } from './content-show.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ContentShowComponent', () => {
  let component: ContentShowComponent;
  let fixture: ComponentFixture<ContentShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentShowComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
