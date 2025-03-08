import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleComponent } from './detailed-people.component';

describe('DetailedPeopleComponent', () => {
  let component: DetailedPeopleComponent;
  let fixture: ComponentFixture<DetailedPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
