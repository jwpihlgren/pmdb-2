import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedMenuComponent } from './tabbed-menu.component';

describe('TabbedMenuComponent', () => {
  let component: TabbedMenuComponent;
  let fixture: ComponentFixture<TabbedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabbedMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabbedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
