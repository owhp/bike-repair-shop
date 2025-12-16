import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceDataService } from '../../services/service-data.service';
import { Service } from '../../models/service.interface';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceDataService: ServiceDataService) {}

  ngOnInit(): void {
    this.serviceDataService.getServices().subscribe(
      services => this.services = services
    );
  }
}
