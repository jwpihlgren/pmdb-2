import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleCastShowComponent } from './detailed-people-cast-show.component';

describe('DetailedPeopleCastShowComponent', () => {
  let component: DetailedPeopleCastShowComponent;
  let fixture: ComponentFixture<DetailedPeopleCastShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleCastShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleCastShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
