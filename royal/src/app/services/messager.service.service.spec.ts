import { TestBed } from '@angular/core/testing';

import { MessagerService } from './messager.service.service';

describe('MessagerServiceService', () => {
  let service: MessagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
