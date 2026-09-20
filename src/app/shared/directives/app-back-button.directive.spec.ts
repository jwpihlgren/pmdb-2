import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AppBackButtonDirective } from './app-back-button.directive';

describe('AppBackButtonDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    });
  });

  it('should create an instance', () => {
    // inject() and input() need an injection context, so build it inside one.
    const directive = TestBed.runInInjectionContext(() => new AppBackButtonDirective());
    expect(directive).toBeTruthy();
  });
});
