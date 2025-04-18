import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedShowCastComponent } from './detailed-show-cast.component';

describe('DetailedShowCastComponent', () => {
  let component: DetailedShowCastComponent;
  let fixture: ComponentFixture<DetailedShowCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedShowCastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedShowCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
