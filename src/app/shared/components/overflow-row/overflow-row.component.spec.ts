import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverflowRowComponent } from './overflow-row.component';

describe('OverflowRowComponent', () => {
  let component: OverflowRowComponent;
  let fixture: ComponentFixture<OverflowRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverflowRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverflowRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
