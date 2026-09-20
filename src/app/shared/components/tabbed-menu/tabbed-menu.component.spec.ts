import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedMenuComponent } from './tabbed-menu.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('TabbedMenuComponent', () => {
  let component: TabbedMenuComponent;
  let fixture: ComponentFixture<TabbedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabbedMenuComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabbedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
