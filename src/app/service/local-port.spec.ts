import { TestBed } from '@angular/core/testing';

import { LocalPort } from './local-port';

describe('LocalPort', () => {
  let service: LocalPort;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalPort);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
