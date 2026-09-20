import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostersComponent } from './posters.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('PostersComponent', () => {
  let component: PostersComponent;
  let fixture: ComponentFixture<PostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostersComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
