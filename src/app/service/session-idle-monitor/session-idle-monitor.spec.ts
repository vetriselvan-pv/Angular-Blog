import { TestBed } from '@angular/core/testing';

import { SessionIdleMonitor } from './session-idle-monitor';

describe('SessionIdleMonitor', () => {
  let service: SessionIdleMonitor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionIdleMonitor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
