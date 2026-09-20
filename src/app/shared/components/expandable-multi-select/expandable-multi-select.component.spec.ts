import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableMultiSelectComponent } from './expandable-multi-select.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ExpandableMultiSelectComponent', () => {
  let component: ExpandableMultiSelectComponent;
  let fixture: ComponentFixture<ExpandableMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandableMultiSelectComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandableMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
