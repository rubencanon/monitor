import { TestBed } from '@angular/core/testing';

import { HttpCliService } from './http-cli.service';

describe('HttpCliService', () => {
  let service: HttpCliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
