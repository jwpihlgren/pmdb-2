import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedShowOverviewComponent } from './detailed-show-overview.component';

describe('DetailedShowOverviewComponent', () => {
  let component: DetailedShowOverviewComponent;
  let fixture: ComponentFixture<DetailedShowOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedShowOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedShowOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
