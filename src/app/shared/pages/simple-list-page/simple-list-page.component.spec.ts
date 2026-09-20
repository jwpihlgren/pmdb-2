import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleListPageComponent } from './simple-list-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('SimpleListPageComponent', () => {
  let component: SimpleListPageComponent;
  let fixture: ComponentFixture<SimpleListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleListPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
