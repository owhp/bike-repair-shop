import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Appointment } from '../../models/appointment.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.bookingService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.loading = false;
      }
    });
  }

  updateStatus(appointmentId: string, status: Appointment['status']): void {
    this.bookingService.updateAppointmentStatus(appointmentId, status).subscribe({
      next: () => {
        const appointment = this.appointments.find(a => a.id === appointmentId);
        if (appointment) {
          appointment.status = status;
        }
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
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

  getCountByStatus(status: string): number {
    return this.appointments.filter(a => a.status === status).length;
  }
}
