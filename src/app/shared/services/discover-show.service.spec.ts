import { TestBed } from '@angular/core/testing';
import { DiscoverShowService } from './discover-show.service';


describe('DiscoverTvService', () => {
  let service: DiscoverShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
