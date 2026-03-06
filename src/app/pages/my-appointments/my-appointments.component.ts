import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../models/appointment.interface';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);

  appointments: Appointment[] = [];
  loading = true;

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.bookingService.getAppointmentsByUserId(currentUser.id).subscribe({
        next: (appointments) => {
          this.appointments = appointments;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading appointments:', error);
          this.loading = false;
        }
      });
    }
  }

  cancelAppointment(appointmentId: string): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.bookingService.cancelAppointment(appointmentId).subscribe({
        next: () => {
          const appointment = this.appointments.find(a => a.id === appointmentId);
          if (appointment) {
            appointment.status = 'cancelled';
          }
        },
        error: (error) => {
          console.error('Error cancelling appointment:', error);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'cancelled': 'status-cancelled',
      'completed': 'status-completed'
    };
    return statusMap[status] || '';
  }
}
