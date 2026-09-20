import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListboxComponent } from './listbox.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ListboxComponent', () => {
  let component: ListboxComponent;
  let fixture: ComponentFixture<ListboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListboxComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
