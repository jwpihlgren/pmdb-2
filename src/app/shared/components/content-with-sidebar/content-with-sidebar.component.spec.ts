import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWithSidebarComponent } from './content-with-sidebar.component';

describe('ContentWithSidebarComponent', () => {
  let component: ContentWithSidebarComponent;
  let fixture: ComponentFixture<ContentWithSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentWithSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentWithSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
