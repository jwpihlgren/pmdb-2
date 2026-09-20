import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AppEventTriggerDirective } from './app-event-trigger.directive';

describe('AppEventTriggerDirective', () => {
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
    const directive = TestBed.runInInjectionContext(() => new AppEventTriggerDirective());
    expect(directive).toBeTruthy();
  });
});
