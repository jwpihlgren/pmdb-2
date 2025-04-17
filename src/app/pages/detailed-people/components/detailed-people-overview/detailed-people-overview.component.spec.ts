import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleOverviewComponent } from './detailed-people-overview.component';

describe('DetailedPeopleOverviewComponent', () => {
  let component: DetailedPeopleOverviewComponent;
  let fixture: ComponentFixture<DetailedPeopleOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
