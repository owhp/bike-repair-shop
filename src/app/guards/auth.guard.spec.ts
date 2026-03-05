import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { provideRouter } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/my-appointments' } as RouterStateSnapshot;

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

  it('should allow access when user is authenticated', (done) => {
    const authService = TestBed.inject(AuthService);
    authService.login('customer@example.com', 'pass').subscribe(() => {
      const result = executeGuard(mockRoute, mockState);
      expect(result).toBeTrue();
      done();
    });
  });
});
