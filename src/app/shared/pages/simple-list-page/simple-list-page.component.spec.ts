import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleListPageComponent } from './simple-list-page.component';

describe('SimpleListPageComponent', () => {
  let component: SimpleListPageComponent;
  let fixture: ComponentFixture<SimpleListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleListPageComponent]
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
