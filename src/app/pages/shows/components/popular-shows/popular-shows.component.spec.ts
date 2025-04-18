import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularShowsComponent } from './popular-shows.component';

describe('PopularShowsComponent', () => {
  let component: PopularShowsComponent;
  let fixture: ComponentFixture<PopularShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularShowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
