import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPeopleImagesComponent } from './detailed-people-images.component';

describe('DetailedPeopleImagesComponent', () => {
  let component: DetailedPeopleImagesComponent;
  let fixture: ComponentFixture<DetailedPeopleImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPeopleImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPeopleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
