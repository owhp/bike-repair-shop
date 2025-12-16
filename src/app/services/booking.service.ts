import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Booking } from '../models/booking.interface';
import { Appointment } from '../models/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private currentBookingSubject: BehaviorSubject<Booking>;
  public currentBooking: Observable<Booking>;

  // Mock appointments database
  private mockAppointments: Appointment[] = [
    {
      id: '1',
      userId: '1',
      serviceId: '1',
      serviceName: 'Basic Tune-Up',
      dateTime: new Date(2024, 11, 20, 10, 0),
      contactName: 'John Doe',
      contactEmail: 'john@example.com',
      contactPhone: '123-456-7890',
      notes: 'My bike makes weird noises',
      status: 'confirmed',
      createdAt: new Date(2024, 11, 15)
    }
  ];

  constructor() {
    this.currentBookingSubject = new BehaviorSubject<Booking>({
      serviceId: ''
    });
    this.currentBooking = this.currentBookingSubject.asObservable();
  }

  public get currentBookingValue(): Booking {
    return this.currentBookingSubject.value;
  }

  updateBooking(booking: Partial<Booking>): void {
    const current = this.currentBookingSubject.value;
    this.currentBookingSubject.next({ ...current, ...booking });
  }

  resetBooking(): void {
    this.currentBookingSubject.next({ serviceId: '' });
  }

  createAppointment(userId: string, booking: Booking): Observable<Appointment> {
    const newAppointment: Appointment = {
      id: (this.mockAppointments.length + 1).toString(),
      userId,
      serviceId: booking.serviceId,
      serviceName: booking.serviceName || '',
      dateTime: booking.dateTime || new Date(),
      contactName: booking.contactName || '',
      contactEmail: booking.contactEmail || '',
      contactPhone: booking.contactPhone || '',
      notes: booking.notes,
      status: 'pending',
      createdAt: new Date()
    };

    this.mockAppointments.push(newAppointment);
    return of(newAppointment).pipe(delay(500));
  }

  getAppointmentsByUserId(userId: string): Observable<Appointment[]> {
    const appointments = this.mockAppointments.filter(a => a.userId === userId);
    return of(appointments).pipe(delay(300));
  }

  getAllAppointments(): Observable<Appointment[]> {
    return of(this.mockAppointments).pipe(delay(300));
  }

  cancelAppointment(appointmentId: string): Observable<boolean> {
    const appointment = this.mockAppointments.find(a => a.id === appointmentId);
    if (appointment) {
      appointment.status = 'cancelled';
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  updateAppointmentStatus(appointmentId: string, status: Appointment['status']): Observable<boolean> {
    const appointment = this.mockAppointments.find(a => a.id === appointmentId);
    if (appointment) {
      appointment.status = status;
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
