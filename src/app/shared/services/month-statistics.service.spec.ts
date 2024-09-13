import { TestBed } from '@angular/core/testing';

import { MonthStatisticsService } from './month-statistics.service';

describe('MonthStatisticsService', () => {
  let service: MonthStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
