import { Component, OnInit, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ServiceDataService } from '../../services/service-data.service';
import { Service } from '../../models/service.interface';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  private serviceDataService = inject(ServiceDataService);

  services: Service[] = [];

  ngOnInit(): void {
    this.serviceDataService.getServices().subscribe(
      services => this.services = services
    );
  }
}
