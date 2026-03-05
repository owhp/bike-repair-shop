import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';
import { Booking } from '../models/booking.interface';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should start with an empty booking', () => {
      expect(service.currentBookingValue).toEqual({ serviceId: '' });
    });
  });

  describe('updateBooking', () => {
    it('should update the booking with new fields', () => {
      service.updateBooking({ serviceId: '1', serviceName: 'Basic Tune-Up' });
      expect(service.currentBookingValue.serviceId).toBe('1');
      expect(service.currentBookingValue.serviceName).toBe('Basic Tune-Up');
    });

    it('should merge updates with existing booking data', () => {
      service.updateBooking({ serviceId: '1', serviceName: 'Basic Tune-Up' });
      service.updateBooking({ contactName: 'Jane' });
      expect(service.currentBookingValue.serviceId).toBe('1');
      expect(service.currentBookingValue.contactName).toBe('Jane');
    });
  });

  describe('resetBooking', () => {
    it('should reset booking back to empty state', () => {
      service.updateBooking({ serviceId: '2', serviceName: 'Flat Tire Repair' });
      service.resetBooking();
      expect(service.currentBookingValue).toEqual({ serviceId: '' });
    });
  });

  describe('createAppointment', () => {
    it('should create an appointment and return it', (done) => {
      const booking: Booking = {
        serviceId: '1',
        serviceName: 'Basic Tune-Up',
        dateTime: new Date(),
        contactName: 'Jane',
        contactEmail: 'jane@example.com',
        contactPhone: '555-0001',
      };
      service.createAppointment('user1', booking).subscribe(appointment => {
        expect(appointment).toBeTruthy();
        expect(appointment.serviceId).toBe('1');
        expect(appointment.contactName).toBe('Jane');
        expect(appointment.status).toBe('pending');
        done();
      });
    });
  });

  describe('getAppointmentsByUserId', () => {
    it('should return appointments for a specific user', (done) => {
      service.getAppointmentsByUserId('1').subscribe(appointments => {
        expect(appointments.length).toBeGreaterThan(0);
        appointments.forEach(a => expect(a.userId).toBe('1'));
        done();
      });
    });

    it('should return empty array for unknown user', (done) => {
      service.getAppointmentsByUserId('unknown').subscribe(appointments => {
        expect(appointments.length).toBe(0);
        done();
      });
    });
  });

  describe('getAllAppointments', () => {
    it('should return all appointments', (done) => {
      service.getAllAppointments().subscribe(appointments => {
        expect(appointments.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('cancelAppointment', () => {
    it('should cancel an existing appointment and return true', (done) => {
      service.cancelAppointment('1').subscribe(result => {
        expect(result).toBeTrue();
        done();
      });
    });

    it('should mark the appointment as cancelled', (done) => {
      service.cancelAppointment('1').subscribe(() => {
        service.getAllAppointments().subscribe(appointments => {
          const cancelled = appointments.find(a => a.id === '1');
          expect(cancelled?.status).toBe('cancelled');
          done();
        });
      });
    });

    it('should return false for a non-existent appointment', (done) => {
      service.cancelAppointment('9999').subscribe(result => {
        expect(result).toBeFalse();
        done();
      });
    });
  });

  describe('updateAppointmentStatus', () => {
    it('should update status of an existing appointment', (done) => {
      service.updateAppointmentStatus('1', 'confirmed').subscribe(result => {
        expect(result).toBeTrue();
        done();
      });
    });

    it('should return false for a non-existent appointment', (done) => {
      service.updateAppointmentStatus('9999', 'confirmed').subscribe(result => {
        expect(result).toBeFalse();
        done();
      });
    });
  });
});
