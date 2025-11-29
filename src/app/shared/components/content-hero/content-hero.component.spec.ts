import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHeroComponent } from './content-hero.component';

describe('ContentHeroComponent', () => {
  let component: ContentHeroComponent;
  let fixture: ComponentFixture<ContentHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
