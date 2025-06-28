import { TestBed } from '@angular/core/testing';

import { LoggedinNologinGuard } from './loggedin-nologin.guard';

describe('LoggedinNologinGuard', () => {
  let guard: LoggedinNologinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedinNologinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
