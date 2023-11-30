import { TestBed } from '@angular/core/testing';

import { GetSingleUserService } from './get-single-user.service';

describe('GetSingleUserService', () => {
  let service: GetSingleUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSingleUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
