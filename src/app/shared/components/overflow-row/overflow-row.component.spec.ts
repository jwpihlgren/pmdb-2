import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverflowRowComponent } from './overflow-row.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('OverflowRowComponent', () => {
  let component: OverflowRowComponent;
  let fixture: ComponentFixture<OverflowRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverflowRowComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverflowRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
