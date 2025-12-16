import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-contact-details',
    imports: [CommonModule, FormsModule],
    templateUrl: './contact-details.component.html',
    styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit {
  contactName = '';
  contactEmail = '';
  contactPhone = '';
  notes = '';

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

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
