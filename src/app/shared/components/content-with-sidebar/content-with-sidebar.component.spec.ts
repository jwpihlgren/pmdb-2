import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWithSidebarComponent } from './content-with-sidebar.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ContentWithSidebarComponent', () => {
  let component: ContentWithSidebarComponent;
  let fixture: ComponentFixture<ContentWithSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentWithSidebarComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentWithSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
