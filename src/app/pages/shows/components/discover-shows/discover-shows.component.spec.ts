import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverShowsComponent } from './discover-shows.component';

describe('DiscoverShowsComponent', () => {
  let component: DiscoverShowsComponent;
  let fixture: ComponentFixture<DiscoverShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverShowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
