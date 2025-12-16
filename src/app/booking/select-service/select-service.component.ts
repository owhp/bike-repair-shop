import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceDataService } from '../../services/service-data.service';
import { BookingService } from '../../services/booking.service';
import { Service } from '../../models/service.interface';

@Component({
  selector: 'app-select-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.css'
})
export class SelectServiceComponent implements OnInit {
  services: Service[] = [];

  constructor(
    private serviceDataService: ServiceDataService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceDataService.getServices().subscribe(
      services => this.services = services
    );
  }

  selectService(service: Service): void {
    this.bookingService.updateBooking({
      serviceId: service.id,
      serviceName: service.name
    });
    this.router.navigate(['/book/choose-datetime']);
  }
}
