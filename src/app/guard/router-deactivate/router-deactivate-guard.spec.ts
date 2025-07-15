import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { routerDeactivateGuard } from '../router-deactivate/router-deactivate-guard';

describe('routerDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routerDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
