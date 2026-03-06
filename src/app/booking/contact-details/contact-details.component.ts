import { Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private router = inject(Router);

  contactName = '';
  contactEmail = '';
  contactPhone = '';
  notes = '';

  ngOnInit(): void {
    const booking = this.bookingService.currentBookingValue;
    if (!booking.serviceId || !booking.dateTime) {
      this.router.navigate(['/book/select-service']);
    }
  }

  continue(): void {
    if (this.contactName && this.contactEmail && this.contactPhone) {
      this.bookingService.updateBooking({
        contactName: this.contactName,
        contactEmail: this.contactEmail,
        contactPhone: this.contactPhone,
        notes: this.notes
      });
      this.router.navigate(['/book/review-confirm']);
    }
  }

  goBack(): void {
    this.router.navigate(['/book/choose-datetime']);
  }
}
