import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../models/booking.interface';

@Component({
  selector: 'app-review-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-confirm.component.html',
  styleUrl: './review-confirm.component.css'
})
export class ReviewConfirmComponent implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private router = inject(Router);

  booking?: Booking;
  isSubmitting = false;

  ngOnInit(): void {
    this.booking = this.bookingService.currentBookingValue;
    if (!this.booking.serviceId || !this.booking.dateTime || !this.booking.contactName) {
      this.router.navigate(['/book/select-service']);
    }
  }

  confirm(): void {
    this.isSubmitting = true;
    const currentUser = this.authService.currentUserValue;
    const userId = currentUser?.id || 'guest';

    this.bookingService.createAppointment(userId, this.booking!).subscribe({
      next: () => {
        this.bookingService.resetBooking();
        this.router.navigate(['/booking-confirmation']);
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/book/contact-details']);
  }
}
