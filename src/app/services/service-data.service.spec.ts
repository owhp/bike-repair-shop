import { TestBed } from '@angular/core/testing';

import { ServiceDataService } from './service-data.service';

describe('ServiceDataService', () => {
  let service: ServiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getServices', () => {
    it('should return an array of services', (done) => {
      service.getServices().subscribe(services => {
        expect(services).toBeTruthy();
        expect(services.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return services with required fields', (done) => {
      service.getServices().subscribe(services => {
        services.forEach(s => {
          expect(s.id).toBeTruthy();
          expect(s.name).toBeTruthy();
          expect(s.description).toBeTruthy();
          expect(s.price).toBeGreaterThan(0);
          expect(s.duration).toBeGreaterThan(0);
        });
        done();
      });
    });

    it('should include the Basic Tune-Up service', (done) => {
      service.getServices().subscribe(services => {
        const tuneUp = services.find(s => s.name === 'Basic Tune-Up');
        expect(tuneUp).toBeTruthy();
        done();
      });
    });
  });

  describe('getServiceById', () => {
    it('should return the correct service for a valid id', (done) => {
      service.getServiceById('1').subscribe(s => {
        expect(s).toBeTruthy();
        expect(s!.id).toBe('1');
        expect(s!.name).toBe('Basic Tune-Up');
        done();
      });
    });

    it('should return undefined for an unknown id', (done) => {
      service.getServiceById('9999').subscribe(s => {
        expect(s).toBeUndefined();
        done();
      });
    });
  });
});
