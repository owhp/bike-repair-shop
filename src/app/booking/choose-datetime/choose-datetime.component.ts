import { Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-choose-datetime',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './choose-datetime.component.html',
  styleUrl: './choose-datetime.component.css'
})
export class ChooseDatetimeComponent implements OnInit {
  private bookingService = inject(BookingService);
  private router = inject(Router);

  selectedDate = '';
  selectedTime = '';
  availableTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  ngOnInit(): void {
    const booking = this.bookingService.currentBookingValue;
    if (!booking.serviceId) {
      this.router.navigate(['/book/select-service']);
    }
  }

  continue(): void {
    if (this.selectedDate && this.selectedTime) {
      const dateTime = new Date(this.selectedDate + 'T' + this.selectedTime);
      this.bookingService.updateBooking({ dateTime });
      this.router.navigate(['/book/contact-details']);
    }
  }

  goBack(): void {
    this.router.navigate(['/book/select-service']);
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
