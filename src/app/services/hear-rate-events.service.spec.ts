import { TestBed } from '@angular/core/testing';

import { HearRateEventsService } from './hear-rate-events.service';

describe('HearRateEventsService', () => {
  let service: HearRateEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HearRateEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
