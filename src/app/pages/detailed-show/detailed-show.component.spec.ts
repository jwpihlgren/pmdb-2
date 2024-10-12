import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedShowComponent } from './detailed-show.component';

describe('DetailedShowComponent', () => {
  let component: DetailedShowComponent;
  let fixture: ComponentFixture<DetailedShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
