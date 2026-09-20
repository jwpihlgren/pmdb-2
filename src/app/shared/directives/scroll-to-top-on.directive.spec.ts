import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ScrollToTopOnDirective } from './scroll-to-top-on.directive';

describe('ScrollToTopOnDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
      ]
    });
  });

  it('should create an instance', () => {
    // inject() and input() need an injection context, so build it inside one.
    const directive = TestBed.runInInjectionContext(() => new ScrollToTopOnDirective());
    expect(directive).toBeTruthy();
  });
});
