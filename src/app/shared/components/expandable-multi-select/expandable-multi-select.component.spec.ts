import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableMultiSelectComponent } from './expandable-multi-select.component';

describe('ExpandableMultiSelectComponent', () => {
  let component: ExpandableMultiSelectComponent;
  let fixture: ComponentFixture<ExpandableMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandableMultiSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandableMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
