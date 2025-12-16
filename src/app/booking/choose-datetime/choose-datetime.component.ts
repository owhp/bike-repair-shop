import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-choose-datetime',
    imports: [CommonModule, FormsModule],
    templateUrl: './choose-datetime.component.html',
    styleUrl: './choose-datetime.component.css'
})
export class ChooseDatetimeComponent implements OnInit {
  selectedDate = '';
  selectedTime = '';
  availableTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

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
