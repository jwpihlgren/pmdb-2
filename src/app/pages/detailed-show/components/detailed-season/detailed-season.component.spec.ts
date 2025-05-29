import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSeasonComponent } from './detailed-season.component';

describe('DetailedSeasonComponent', () => {
  let component: DetailedSeasonComponent;
  let fixture: ComponentFixture<DetailedSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedSeasonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
