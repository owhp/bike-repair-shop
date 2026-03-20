import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { provideRouter } from '@angular/router';

import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';

describe('adminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should block access when user is not authenticated', () => {
    const result = executeGuard(mockRoute, mockState);
    expect(result).toBeFalse();
  });

  it('should block access for a non-admin customer', (done) => {
    const authService = TestBed.inject(AuthService);
    authService.login('customer@example.com', 'pass').subscribe(() => {
      const result = executeGuard(mockRoute, mockState);
      expect(result).toBeFalse();
      done();
    });
  });

  it('should allow access for an authenticated admin', (done) => {
    const authService = TestBed.inject(AuthService);
    authService.login('admin@example.com', 'pass').subscribe(() => {
      const result = executeGuard(mockRoute, mockState);
      expect(result).toBeTrue();
      done();
    });
  });
});
