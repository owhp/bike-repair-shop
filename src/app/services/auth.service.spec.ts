import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have no logged-in user when localStorage is empty', () => {
      expect(service.currentUserValue).toBeNull();
    });

    it('should not be authenticated when no user is stored', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('login', () => {
    it('should log in a customer with valid credentials', (done) => {
      service.login('customer@example.com', 'any-password').subscribe(user => {
        expect(user).toBeTruthy();
        expect(user.email).toBe('customer@example.com');
        expect(user.role).toBe('customer');
        done();
      });
    });

    it('should log in an admin with valid credentials', (done) => {
      service.login('admin@example.com', 'any-password').subscribe(user => {
        expect(user).toBeTruthy();
        expect(user.email).toBe('admin@example.com');
        expect(user.role).toBe('admin');
        done();
      });
    });

    it('should set currentUserValue after successful login', (done) => {
      service.login('customer@example.com', 'pass').subscribe(() => {
        expect(service.currentUserValue).toBeTruthy();
        expect(service.currentUserValue?.email).toBe('customer@example.com');
        done();
      });
    });

    it('should persist user to localStorage on login', (done) => {
      service.login('customer@example.com', 'pass').subscribe(() => {
        const stored = localStorage.getItem('currentUser');
        expect(stored).toBeTruthy();
        expect(JSON.parse(stored!).email).toBe('customer@example.com');
        done();
      });
    });

    it('should throw an error for unknown credentials', () => {
      expect(() => service.login('unknown@example.com', 'pass')).toThrow();
    });
  });

  describe('logout', () => {
    it('should clear currentUserValue on logout', (done) => {
      service.login('customer@example.com', 'pass').subscribe(() => {
        service.logout();
        expect(service.currentUserValue).toBeNull();
        done();
      });
    });

    it('should remove user from localStorage on logout', (done) => {
      service.login('customer@example.com', 'pass').subscribe(() => {
        service.logout();
        expect(localStorage.getItem('currentUser')).toBeNull();
        done();
      });
    });
  });

  describe('register', () => {
    it('should register a new user and set them as current', (done) => {
      service.register('Jane Smith', 'jane@example.com', '555-1234', 'pass').subscribe(user => {
        expect(user).toBeTruthy();
        expect(user.name).toBe('Jane Smith');
        expect(user.email).toBe('jane@example.com');
        expect(user.role).toBe('customer');
        done();
      });
    });

    it('should persist registered user to localStorage', (done) => {
      service.register('Jane Smith', 'jane@example.com', '555-1234', 'pass').subscribe(() => {
        const stored = localStorage.getItem('currentUser');
        expect(stored).toBeTruthy();
        expect(JSON.parse(stored!).email).toBe('jane@example.com');
        done();
      });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when a user is logged in', (done) => {
      service.login('customer@example.com', 'pass').subscribe(() => {
        expect(service.isAuthenticated()).toBeTrue();
        done();
      });
    });

    it('should return false after logout', (done) => {
      service.login('customer@example.com', 'pass').subscribe(() => {
        service.logout();
        expect(service.isAuthenticated()).toBeFalse();
        done();
      });
    });
  });

  describe('isAdmin', () => {
    it('should return false for a customer', (done) => {
      service.login('customer@example.com', 'pass').subscribe(() => {
        expect(service.isAdmin()).toBeFalse();
        done();
      });
    });

    it('should return true for an admin', (done) => {
      service.login('admin@example.com', 'pass').subscribe(() => {
        expect(service.isAdmin()).toBeTrue();
        done();
      });
    });
  });
});
