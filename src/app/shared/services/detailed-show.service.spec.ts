import { TestBed } from '@angular/core/testing';
import { DetailedShowService } from './detailed-show.service';


describe('ShowDetailService', () => {
  let service: DetailedShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
