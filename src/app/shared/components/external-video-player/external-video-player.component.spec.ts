import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalVideoPlayerComponent } from './external-video-player.component';

describe('ExternalVideoPlayerComponent', () => {
  let component: ExternalVideoPlayerComponent;
  let fixture: ComponentFixture<ExternalVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalVideoPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
